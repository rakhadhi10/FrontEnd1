import { Progress } from "antd";

export const UnitKerjaTab = ({ children }) => {
  const tipeObjekPersentase = [
    { tipeObjek: "Tata Kelola IT", jumlah: 0, persentase: 0 },
    { tipeObjek: "Aplikasi", jumlah: 0, persentase: 0 },
    { tipeObjek: "Infrastruktur", jumlah: 0, persentase: 0 },
    { tipeObjek: "Pemulihan Bencana", jumlah: 0, persentase: 0 },
    { tipeObjek: "Jasa IT oleh Bank", jumlah: 0, persentase: 0 },
    { tipeObjek: "Anak Perusahaan", jumlah: 0, persentase: 0 },
    { tipeObjek: "Objek IT Lainnya", jumlah: 0, persentase: 0 },
    { tipeObjek: "Keamanan", jumlah: 0, persentase: 0 },
    { tipeObjek: "Pengadaan TI", jumlah: 0, persentase: 0 },
    { tipeObjek: "Jasa pihak ketiga TI", jumlah: 0, persentase: 0 },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-20 ">
        {tipeObjekPersentase.map((item) => (
          <div key={item.tipeObjek} className="grid grid-cols-2">
            <p>{item.tipeObjek}</p>
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
