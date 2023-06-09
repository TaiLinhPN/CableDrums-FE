export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  theme: "primary" | "secondary";
  func?: () => void;
}

function MyButton({ label, theme, func, ...rest }: ButtonProps) {
  return (
    <button {...rest} onClick={func}>
      {label}
    </button>
  );
}

export default MyButton;
