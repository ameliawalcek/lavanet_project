import { useState, useEffect, useRef } from "react";
import { StargateClient, Block } from "@cosmjs/stargate";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgRelayPayment } from "@lavanet/lava-sdk/bin/src/codec/pairing/tx";
import Loader from "./Loader";
import StickyHeader from "./StickyHeader";
import ChainsTableRows from "./ChainsTableRows";

// Define constants
const BLOCKS_FETCH_LIMIT = 20; // Maximum number of blocks to fetch
const MESSAGE_TYPE = "/lavanet.lava.pairing.MsgRelayPayment"; // Type of messages to process

// Define interface for chain data
export interface ChainData {
  specId: string; // Chain specification ID
  relayNumTotal: number; // Total number of relays
}

// ChainsTable component
const TopChainsTable: React.FC = () => {
  // Refs for tracking previous block height and update status
  const prevBlockHeightRef = useRef<number>(0); // Stores the previous block height
  const isUpdatingRef = useRef<boolean>(false); // Flag to prevent concurrent updates\
  const blockRecordRef = useRef<number[]>([]);

  // State for top chains and loading indicator
  const [topChains, setTopChains] = useState<ChainData[]>([]); // Holds the top chains data
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading indicator
  const [isUpdatingBlocks, setIsUpdatingBlocks] = useState<boolean>(false);

  // Fetch blocks from the blockchain
  const fetchBlocks = async (
    client: StargateClient,
    startHeight: number,
    endHeight: number
  ): Promise<Block[]> => {
    console.log(`Fetching blocks ${startHeight} -> ${endHeight}`);

    // Recorded to update header
    if (blockRecordRef.current.length === 0) {
      blockRecordRef.current = [startHeight, endHeight];
    } else {
      blockRecordRef.current[1] = endHeight;
    }

    const blockHeights = Array.from(
      { length: endHeight - startHeight + 1 },
      (_, i) => startHeight + i
    );
    const blockPromises = blockHeights.map((height) => client.getBlock(height));
    const blocks = await Promise.all(blockPromises);
    return blocks.slice(-BLOCKS_FETCH_LIMIT); // Fetch a maximum of BLOCKS_FETCH_LIMIT blocks
  };

  // Process relay data from blocks
  const processRelayData = (
    blocks: Block[],
    messageType: string
  ): MsgRelayPayment["relays"] => {
    console.log("Processing relay data");
    try {
      return blocks.flatMap((block) =>
        block.txs.flatMap((tx) => {
          const decodedMessages = (tx && Tx.decode(tx)?.body?.messages) || [];
          return decodedMessages
            .filter((msg) => msg.typeUrl === messageType) // Filter messages of the specified type
            .flatMap(
              (msg) =>
                (msg?.value && MsgRelayPayment.decode(msg.value)?.relays) || []
            );
        })
      );
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // Calculate top chains based on relay data
  const calculateTopChains = (
    relays: MsgRelayPayment["relays"]
  ): ChainData[] => {
    const chainTotals = relays.reduce((totals, data) => {
      if (data?.specId) {
        const {
          specId,
          relayNum: { low },
        } = data;
        totals.set(specId, (totals.get(specId) || 0) + low);
      }
      return totals;
    }, new Map<string, number>());

    const chainTotalsArray = Array.from(
      chainTotals,
      ([specId, relayNumTotal]) => ({
        specId,
        relayNumTotal,
      })
    );
    chainTotalsArray.sort(
      (chainA, chainB) => chainB.relayNumTotal - chainA.relayNumTotal
    );
    return chainTotalsArray.slice(0, 10); // Get the top 10 chains
  };

  useEffect(() => {
    // Fetch and update data at intervals
    const fetchData = async () => {
      if (isUpdatingRef.current) return; // Prevent concurrent updates

      try {
        isUpdatingRef.current = true; // Set updating flag
        setIsLoading(true); // Show loading indicator

        const client = await StargateClient.connect(
          import.meta.env.VITE_LAVA_URL
        );
        const currentBlockHeight = await client.getHeight();

        if (prevBlockHeightRef.current !== currentBlockHeight) {
          console.log("Fetching new block data");
          setIsUpdatingBlocks(true);
          const startHeight =
            prevBlockHeightRef.current !== 0
              ? prevBlockHeightRef.current
              : Math.max(0, currentBlockHeight - BLOCKS_FETCH_LIMIT); // Fetch data for the last BLOCKS_FETCH_LIMIT blocks

          const blocks = await fetchBlocks(
            client,
            startHeight,
            currentBlockHeight
          );
          const relays = processRelayData(blocks, MESSAGE_TYPE);
          const newTopChains = calculateTopChains(relays);
          setIsUpdatingBlocks(false);
          if (!compareChains(newTopChains, topChains)) {
            console.log("Updating leaderboard");
            setTopChains(newTopChains);
          }
        }
        prevBlockHeightRef.current = currentBlockHeight; // Update previous block height
      } catch (error) {
        console.error(error);
      } finally {
        isUpdatingRef.current = false; // Reset updating flag
        setIsLoading(false); // Hide loading indicator
      }
    };

    fetchData(); // Call initially when the component mounts

    // Set up interval for data update
    const intervalId = setInterval(fetchData, 10000); // Call fetchData every 10 seconds
    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  // Compare two chain arrays
  const compareChains = (a: ChainData[], b: ChainData[]): boolean =>
    a.length === b.length &&
    a.every((chain, index) => chain.specId === b[index].specId);

  return (
    <div>
      <StickyHeader
        topChains={topChains}
        blockLimit={BLOCKS_FETCH_LIMIT}
        isUpdatingBlocks={isUpdatingBlocks}
        blockRecordRef={blockRecordRef}
      />
      {isLoading && topChains.length === 0 ? (
        <div className="w-full flex justify-center p-10">
          <Loader size={100} />
        </div>
      ) : (
        <ChainsTableRows topChains={topChains} />
      )}
    </div>
  );
};

export default TopChainsTable;
