import TopChainsTable from "./components/TopChainsTable";

const App: React.FC = () => {
  return (
    <div className="bg-secondary h-[100vh] relative z-0 custom-scrollbar sm:overflow-y-auto">
      <TopChainsTable />
    </div>
  );
};

export default App;
