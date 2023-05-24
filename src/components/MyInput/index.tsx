import MyButton, { ButtonProps } from "../MyButton";
interface InputProp {
  button: ButtonProps;
  space: string;
  placeholder?: string;
}
const MyInput = ({ button, space, placeholder }: InputProp) => {
  return (
    <div className={`relative w-full `}>
      <input
        className={`border w-full  rounded-2xl px-4 py-2 ${space}`}
        type="text"
        placeholder={placeholder}
      />

      <MyButton
        className="absolute right-0  top-0 flex items-center h-full pr-3"
        {...button}
      />
    </div>
  );
};

export default MyInput;
