export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  theme: "primary" | "secondary";
  func?: () => void;
}

function MyButton({ label, theme, func, ...rest }: ButtonProps) {
  return <button  {...rest}  onClick={func} >{label}</button>;
}

export default MyButton;

// function MyButton(props: ButtonProps) {
//   return (
//     <button
//       className={
//         `text-${props.test} ${StyleSheet.get(props.theme)}`
//       }
//     >
//       {props.label}
//     </button>
//   );
// }

// const StyleSheet = new Map([
//   ["primary", "bg-black"],
//   ["secondary", "bg-blue-500"],
// ]);

//    <MyButton
//      className=""
//      label={"dấddsdsdas"}
//      test="3xl text-blue-500"
//      theme="secondary"
//    />;
