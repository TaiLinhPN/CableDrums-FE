import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Progress, Tooltip } from "antd";
import { Contract } from "../../redux/slice/contractSlice";

const totalContracts = (data: Contract[]) => {
  const totals = data.reduce(
    (contract, item) => {
      contract.totalCableDrumCount += item.cableDrumCount;
      contract.totalCableDelivered += item.cableDelivered;
      contract.totalCableRequired += item.cableRequired;
      return contract;
    },
    { totalCableDrumCount: 0, totalCableDelivered: 0, totalCableRequired: 0 }
  );

  return totals;
};

const circularDiagram = (
  totalCableDrumCount: number,
  totalCableDelivered: number,
  totalCableRequired: number
) => {
  if (totalCableDrumCount === 0) {
    return { inProcess: 0, done: 0 };
  }

  const inProcessPercentage =
    ((totalCableRequired + totalCableDelivered) / totalCableDrumCount) * 100;
  const donePercentage = (totalCableDelivered / totalCableDrumCount) * 100;

  return {
    inProcess: +inProcessPercentage.toFixed(2),
    done: +donePercentage.toFixed(2),
  };
};

const ContractChart = () => {
  const { contracts } = useSelector((state: RootState) => state.contract);
  const [dataDiagram, setDataDiagram] = useState({
    inProcess: 0,
    done: 0,
  });

  useEffect(() => {
    const { totalCableDrumCount, totalCableDelivered, totalCableRequired } =
      totalContracts(contracts);
    setDataDiagram(
      circularDiagram(
        totalCableDrumCount,
        totalCableDelivered,
        totalCableRequired
      )
    );
  }, [contracts]);

  console.log(dataDiagram);

  return (
    <div className="shadow p-4 rounded-lg bg-white h-min ">
      <div className="md:flex md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-bold leading-tight">Contract diagram</h2>
          <p className=" text-sm">Contract circular diagram</p>
        </div>
      </div>
      <div className="mt-7  relative">
        <Tooltip title="Contract" className="flex justify-center mb-5">
          <Progress
            percent={dataDiagram.inProcess}
            success={{ percent: dataDiagram.done }}
            type="circle"
            strokeColor={{ "100%": "#fbc44c" }}
          ></Progress>
        </Tooltip>
      </div>
    </div>
  );
};

export default ContractChart;
