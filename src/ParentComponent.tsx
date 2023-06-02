import  { useState } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const [childState, setChildState] = useState<string>("");

  const handleChildStateChange = (newState: string) => {
    setChildState(newState);
  };

  return (
    <div>
      <ChildComponent onChange={handleChildStateChange} />
      <p>Child state in Parent: {childState}</p>
    </div>
  );
}

export default ParentComponent;
