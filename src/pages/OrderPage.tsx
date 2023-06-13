import OrderTable from "../components/Table/OrderTable";

const OrderPage = () => {
  return (
    <div className="flex justify-center ">
      {/* <div
        style={{
          maxHeight: "calc(100vh - 12vh)",
          maxWidth: "calc(100vw - 10vw)",
        }}
        className=" overflow-auto overscroll-auto relative"
      > */}
        <OrderTable />
      {/* </div> */}
    </div>
  );
};

export default OrderPage;
