import { removeUser } from "../../helpers/userHelper";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setOpenModalRemove } from "../../redux/slice/accountSlice";


const RemoveUserForm = () => {
  const dispatch = useDispatch()
  const { readyToRemoveAccount } = useSelector(
    (state: RootState) => state.account
  );

  const [isConfirm, setConfirm] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input === readyToRemoveAccount.username) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [input]);

  const handleRemoveUser = async () => {
    await removeUser(readyToRemoveAccount._id);
    dispatch(setOpenModalRemove(false));
  };

  return (
    <div className="p-3">
      <p className="text-xl font-semibold mb-4">Remove a user</p>
      {!isConfirm ? (
        <div>
          <p className="text-amber-500">
            Unexpected bad things will happen if you're not sure what you are
            doing!
          </p>
          <Button
            className="absolute  bottom-1"
            type="dashed"
            danger
            onClick={() => setConfirm(true)}
          >
            I understand
          </Button>
        </div>
      ) : (
        <div>
          <div>
            <p className="mb-2">
              To confirm, type "
              <span className="text-yellow-red font-medium">
                {readyToRemoveAccount.username}
              </span>
              " in the box below:
            </p>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
            />
          </div>

          <Button
            className="absolute bottom-1"
            type="primary"
            danger
            disabled={isButtonDisabled}
            onClick={handleRemoveUser}
          >
            Delete user
          </Button>
        </div>
      )}
    </div>
  );
};

export default RemoveUserForm;
