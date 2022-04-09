import moment from "moment";
import { Card, Progress } from "antd";

export const KKPTCard = ({
  id,
  kkpt_id,
  nama_kkpt,
  batas_waktu,
  rekomendasi_existing,
  rekomendasi_terisi,
  action_plan_existing,
  action_plan_terisi,
  progress,
  onClick
}) => {
  return (
    <Card hoverable onClick={onClick}>
      <div className="grid grid-cols-3 gap-6">
        <p>{nama_kkpt}</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <p></p>
          <p>	&#931; Eksisting</p>
          <p>	&#931; Terisi</p>
          <p>Rekomendasi</p>
          <p>{rekomendasi_existing}</p>
          <p>{rekomendasi_terisi}</p>
          <p>Action Plan</p>
          <p>{action_plan_existing}</p>
          <p>{action_plan_terisi}</p>
        </div>
        <div className="flex flex-col justify-between">
          <Progress type="line" percent={Math.round((action_plan_terisi / action_plan_existing) * 100)} />
          <div>
            <p>Batas Waktu Terdekat</p>
            <p className="text-right">{batas_waktu && moment(batas_waktu).format("DD MMMM YYYY")}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
