import { ChainData } from "./TopChainsTable";

interface ChainsTableRowsProps {
  topChains: ChainData[];
}

const ChainsTableRows: React.FC<ChainsTableRowsProps> = ({ topChains }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:px-10 px-5 font-extrabold">
      {topChains.map((chain, index) => (
        <div
          key={index}
          className={`${
            index === 0
              ? "bg-red-100"
              : index === 1
              ? "bg-orange-100"
              : index === 2
              ? "bg-yellow-100"
              : "bg-white"
          } mt-2 mb-2 grid grid-cols-3 rounded-lg sm:px-20 px-2 py-5`}
        >
          <div className={`pl-10 ${index < 3 ? "text-white" : "text-black"} `}>
            {index + 1}
          </div>
          <div className={`${index < 3 ? "text-white" : "text-black"}`}>
            {chain.specId}
          </div>
          <div className={`${index < 3 ? "text-white" : "text-black"}`}>
            {chain.relayNumTotal}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChainsTableRows;
