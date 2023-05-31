import { useRef } from "react";
import { messageErrorLog } from "../../utils/notify";
import { resetPasswordApi } from "../../api/userApi";

const ResetPasswordForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current && confirmPasswordRef.current) {
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
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      };
      try {
         const response = await resetPasswordApi(resetPass);
          if (response.status === 201) {
             //setlogin
              emailRef.current!.value = "";
              passwordRef.current!.value = ""
              confirmPasswordRef.current!.value = "";
         }
      } catch (error) {
        
      }
     
  };

  return (
    <div className="form-login">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <div className="mb-4  w-3/4">
        <input
          ref={emailRef}
          className="w-full border border-gray-300 py-2 px-4 rounded-md"
          placeholder="Your email?"
        />
      </div>

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
        Change password
      </button>
    </div>
  );
};

export default ResetPasswordForm;
