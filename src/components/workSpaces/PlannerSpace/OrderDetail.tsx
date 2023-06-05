import { Button, message, Steps } from "antd";
import { useState } from "react";

const steps = [
  {
    title: "First",
  },
  {
    title: "Second",
  },
  {
    title: "Last",
  },
];

const OrderTable = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const items = steps.map((item, index) => ({ key: index, title: item.title }));

  return (
    <div>
      <Steps current={current} items={items} />
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
    
      </div>
    </div>
  );
};

export default OrderTable;
