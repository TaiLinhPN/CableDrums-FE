import { Button, Modal, Skeleton } from "antd";
import { useEffect } from "react";
import CreateUserForm from "../Form/CreateUserForm";
import RemoveUserForm from "../Form/RemoveUserForm";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import Td from "./Td";
import AccountRow from "./AccountRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Account,
  fetchAccountData,
  setOpenModalCreate,
  setOpenModalRemove,
  setReadyToRemoveAccount,
} from "../../redux/slice/accountSlice";

const headerTitles = ["NO.", "Username", "Email", "User Type", "Handle"];

const AccountTable = () => {
  const dispatch = useDispatch();
  const { accounts, isLoading, isSet, isOpenModalCreate, isOpenModalRemove } =
    useSelector((state: RootState) => state.account);

  useEffect(() => {
    fetchAccountData()(dispatch, isSet);
  }, []);

  const handleDelete = (id: string) => {
    const user = accounts.find((acc: Account) => acc._id === id);
    dispatch(setReadyToRemoveAccount(user));
    dispatch(setOpenModalRemove(true));
  };

  return (
    <div>
      <div>
        <Button onClick={() => dispatch(setOpenModalCreate(true))}>
          Create
        </Button>

        <MyTable>
          <Thead titles={headerTitles}></Thead>
          <TBody>
            {accounts?.map((account, index) => (
              <AccountRow key={account._id} no={index + 1} account={account}>
                <Td>
                  <button
                    onClick={() => handleDelete(account._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </Td>
              </AccountRow>
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
          <div className="min-w-full mt-8 text-center">No orders found.</div>
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
