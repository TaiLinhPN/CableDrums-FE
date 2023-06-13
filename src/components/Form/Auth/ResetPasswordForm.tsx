import { useRef } from "react";
import { messageErrorLog } from "../../../utils/notify";
import { resetPasswordApi } from "../../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setEmail } from "../../../redux/slice/authSlice";

interface ResetPasswordFormProps {
  setOpenLogin: (x: boolean) => void;
}
const ResetPasswordForm = ({ setOpenLogin }: ResetPasswordFormProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { emailResetPassword } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (emailRef.current?.value || emailResetPassword) &&
      passwordRef.current?.value &&
      confirmPasswordRef.current?.value
    ) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        messageErrorLog("Passwords do not match");
        return;
      }

      resetPassword();
    } else {
      messageErrorLog("You must enter all fields");
    }
  };

  const resetPassword = async () => {
    const resetPass = {
      email: emailResetPassword || emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    try {
      const response = await resetPasswordApi(resetPass);
      if (response.status === 200) {
        setOpenLogin(true);
        dispatch(setEmail(""));
        (emailRef.current!.value = ""), (passwordRef.current!.value = "");
        confirmPasswordRef.current!.value = "";
      } else if (response.status === 400) {
        messageErrorLog(response.data.message);
      }
    } catch (error) {}
  };

  return (
    <div className="form-login relative ">
      <div
        className="text-xs absolute top-1 left-1 cursor-pointer"
        onClick={() => setOpenLogin(true)}
      >
        Back to login
      </div>
      <h1 className="text-2xl font-bold mb-4 ">Reset Password</h1>

      {!emailResetPassword && (
        <div className="mb-4  w-3/4">
          <input
            ref={emailRef}
            className="w-full border border-gray-300 py-2 px-4 rounded-md"
            placeholder="Your email?"
          />
        </div>
      )}

      <div className="mb-4  w-3/4">
        <input
          ref={passwordRef}
          className="w-full border border-gray-300 py-2 px-4 rounded-md"
          placeholder="New Password"
        />
      </div>

      <div className="mb-4  w-3/4">
        <input
          ref={confirmPasswordRef}
          className="w-full border border-gray-300 py-2 px-4 rounded-md"
          placeholder="Re-Enter Password"
        />
      </div>

      <button className="button-login" onClick={(e) => handleSubmit(e)}>
        Reset
      </button>
    </div>
  );
};

export default ResetPasswordForm;
