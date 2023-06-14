import ContractChart from "../components/Charts/ContractChart";
import ContractTable from "../components/Table/ContractTable";

const ContractPage = () => {
  return (
    <div className="flex space-x-4 justify-center">
      <ContractTable />
      <div className="space-y-4">
        <ContractChart />
      </div>
    </div>
  );
};

export default ContractPage;
