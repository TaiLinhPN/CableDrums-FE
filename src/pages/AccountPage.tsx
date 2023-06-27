import AccountTable from "../components/Table/account/AccountTable";

const AccountPage = () => {
  return (
    <div className="flex space-x-4 justify-center ">
      <AccountTable />
      <div className="space-y-4">
        {/* <Button
          className="bg-white w-full h-10"
          onClick={() => dispatch(setOpenModalCreate(true))}
        >
          Create an account
        </Button> */}
        {/* <AccountChart /> */}
      </div>
    </div>
  );
};

export default AccountPage;
