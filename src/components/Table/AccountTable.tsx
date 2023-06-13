import {  Modal, Skeleton } from "antd";
import { useEffect } from "react";
import CreateUserForm from "../Form/CreateUserForm";
import RemoveUserForm from "../Form/RemoveUserForm";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import AccountRow from "./AccountRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  fetchAccountData,
  setOpenModalCreate,
  setOpenModalRemove,
} from "../../redux/slice/accountSlice";

const headerTitles = ["NO.", "Username", "Email", "User Type", "Handle"];

const AccountTable = () => {
  const dispatch = useDispatch();
  const { accounts, isLoading, isSet, isOpenModalCreate, isOpenModalRemove } =
    useSelector((state: RootState) => state.account);

  useEffect(() => {
    fetchAccountData()(dispatch, isSet);
  }, []);

  return (
    <div
      style={{
        maxHeight: "calc(100vh - 15vh)",
        maxWidth: "calc(100vw - 10vw)",
      }}
      className=" overflow-auto overscroll-auto relative "
    >
      <div>
        <MyTable>
          <Thead titles={headerTitles}></Thead>
          <TBody>
            {accounts?.map((account, index) => (
              <AccountRow key={account._id} no={index + 1} account={account} />
            ))}
          </TBody>
        </MyTable>
        {isLoading && (
          <div className="min-w-full mt-8 space-y-6">
            <Skeleton active />
            <Skeleton active />
          </div>
        )}

        {!isLoading && accounts.length === 0 && (
          <div className="min-w-full mt-8 text-center">No account found.</div>
        )}
      </div>

      {isOpenModalCreate && (
        <Modal
          centered
          open={isOpenModalCreate}
          onCancel={() => dispatch(setOpenModalCreate(false))}
          width={400}
        >
          <CreateUserForm />
        </Modal>
      )}

      {isOpenModalRemove && (
        <Modal
          centered
          open={isOpenModalRemove}
          onCancel={() => dispatch(setOpenModalRemove(false))}
          width={300}
        >
          <RemoveUserForm />
        </Modal>
      )}
    </div>
  );
};

export default AccountTable;
