import ContractTable from "../components/Table/ContractTable";

const ContractPage = () => {
  return (
    <div className="flex space-x-4 justify-center">
      <div
        style={{
          maxHeight: "calc(100vh - 12vh)",
          maxWidth: "calc(100vw - 40vw)",
        }}
        className=" overflow-auto
        overscroll-auto"
      >
        <ContractTable />
      </div>
    </div>
  );
};

export default ContractPage;
