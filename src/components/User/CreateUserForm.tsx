import { useRef } from "react";
import { CreateUserApi, UserType } from "../../api/userApi";
import { messageErrorLog } from "../../utils/notify";
import { createUser } from "../../helpers/userHelper";

interface CreateUserFormProps {
  setModel: (isOpen: boolean) => void;
}
const CreateUserForm = ({ setModel }: CreateUserFormProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userTypeRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      usernameRef.current &&
      emailRef.current &&
      userTypeRef.current &&
      userTypeRef.current.value !== ""
    ) {
      const user: CreateUserApi = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        userType: userTypeRef.current.value as UserType,
      };
      const newUser = await createUser(user);
      if (newUser) {
        setModel(false);
        usernameRef.current.value = "";
        emailRef.current.value = "";
        userTypeRef.current.value = "";
      }
    } else {
      messageErrorLog("You must enter all fields");
    }
  };

  return (
    <div className="form-login">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      <div className="mb-4  w-3/4">
        <input
          ref={usernameRef}
          className="w-full border border-gray-300 py-2 px-4 rounded-md"
          placeholder="What is user's name?"
          name="username"
        />
      </div>

      <div className="mb-4  w-3/4">
        <input
          ref={emailRef}
          className="w-full border border-gray-300 py-2 px-4 rounded-md"
          placeholder="User's email?"
          name="email"
        />
      </div>

      <div className="mb-4 w-3/4">
        <select
          defaultValue=""
          ref={userTypeRef}
          className="w-full border-gray-300 py-2 px-4 border rounded-md "
        >
          <option value="" disabled className="text-g">
            Select user's type
          </option>

          <option value="admin">Admin</option>
          <option value="planner">Planner</option>
          <option value="supplyVendor">Supply Vendor</option>
          <option value="projectContractor">Project Contractor</option>
        </select>
      </div>
      <button className="button-login" onClick={(e) => handleSubmit(e)}>
        Create
      </button>
    </div>
  );
};

export default CreateUserForm;
