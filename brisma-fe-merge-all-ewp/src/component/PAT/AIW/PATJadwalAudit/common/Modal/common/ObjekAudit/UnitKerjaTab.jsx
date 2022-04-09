import { Progress } from "antd";

const UnitKerjaTab = ({ children }) => {
  const ukerPersentase = [
    { uker: "Divisi", jumlah: 0, persentase: 0 },
    { uker: "PA", jumlah: 0, persentase: 0 },
    { uker: "KC", jumlah: 0, persentase: 0 },
    { uker: "KK", jumlah: 0, persentase: 0 },
    { uker: "Kanwil", jumlah: 0, persentase: 0 },
    { uker: "Desk", jumlah: 0, persentase: 0 },
    { uker: "KCP", jumlah: 0, persentase: 0 },
    { uker: "Unit", jumlah: 0, persentase: 0 },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-x-20 ">
        {ukerPersentase.map((item) => (
          <div key={item.uker} className="grid grid-cols-2">
            <p>{item.uker}</p>
            <div className="flex">
              <p className="pr-1">{item.jumlah}</p>
              <Progress percent={item.persentase} />
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default UnitKerjaTab;
