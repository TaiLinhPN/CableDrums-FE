import  { useState, ChangeEvent } from "react";

interface ChildProps {
  onChange: (newState: string) => void;
}

function ChildComponent({ onChange }: ChildProps) {
  const [childState, setChildState] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setChildState(newValue);
    onChange(newValue); // Call the callback function to pass the state to the parent
  };

  return (
    <div>
      <input type="text" value={childState} onChange={handleInputChange} />
      <p>Child state: {childState}</p>
    </div>
  );
}

export default ChildComponent;
