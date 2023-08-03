import Loader from "./Loader";
import { ChainData } from "./TopChainsTable";
import { MutableRefObject } from "react";

interface StickyHeaderProps {
  topChains: ChainData[];
  blockLimit: number;
  isUpdatingBlocks: boolean;
  blockRecordRef: MutableRefObject<number[]>;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  topChains,
  blockLimit,
  isUpdatingBlocks,
  blockRecordRef,
}) => {
  return (
    <div
      className="sticky top-0 z-10 bg-primary blue-glassmorphism"
      style={{ borderRadius: "0px 0px 50px 50px" }}
    >
      <div className="w-[100%] bg-primary sm:py-10 py-5 px-10 text-center">
        <h2 className="bg-primary font-bold text-[3rem] flex content-center justify-center">
          Top Chains
        </h2>
        <h3 className="bg-primary font-bold text-[1.5rem] text-secondary flex content-center justify-center">
          Number of Relays in the Last {blockLimit} Blocks
        </h3>
      </div>
      <div>
        <div
          className="bg-primary flex justify-evenly items-center"
          style={{ borderRadius: "0px 0px 50px 50px" }}
        >
          <div className="relative bg-primary">
            <div className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-primary rounded-full border-4 border-orange-100 text-center text-sm sm:text-base truncate">
              {topChains[2]?.specId}
            </div>
            <div className="text-primary font-extrabold sm:text-[25px] text-[15px] border-2 border-primary flex items-center justify-center absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-orange-100 rounded-full">
              3
            </div>
          </div>
          <div className="relative bg-primary">
            <div className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-primary rounded-full border-4 border-red-100 text-center text-lg sm:text-xl truncate">
              {topChains[0]?.specId}
            </div>
            <div className="text-primary font-extrabold sm:text-[25px] text-[15px] border-2 border-primary flex items-center justify-center absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-red-100 rounded-full">
              1
            </div>
          </div>
          <div className="relative bg-primary">
            <div className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-primary rounded-full border-4 border-yellow-100 text-center text-sm sm:text-base truncate">
              {topChains[1]?.specId}
            </div>
            <div className="text-primary font-extrabold sm:text-[25px] text-[15px] border-2 border-primary flex items-center justify-center absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-100 rounded-full">
              2
            </div>
          </div>
        </div>
      </div>
      {isUpdatingBlocks && topChains.length !== 0 ? (
        <div className="flex justify-center items-center h-[100px]">
          <Loader size={60}/>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-[100px]">
          <div className="text-secondary">Processed blocks from</div>
          <div className="text-secondary">{blockRecordRef.current[0]} to {blockRecordRef.current[1]}</div>
        </div>
      )}
    </div>
  );
};

export default StickyHeader;
