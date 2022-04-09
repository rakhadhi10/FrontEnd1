import moment from "moment";
import { Avatar, Col, Row, Space } from "antd"
import STATUS from "../../../../utils/rpmStatus";

export default function CardActionPlan({
  batas_waktu,
  hasil_evaluasi,
  id,
  nama,
  nama_status,
  status_kode,
  logChecker = [],
  logSigner = [],
  table,
}) {
  return (
    <div
      className="w-full p-4 shadow-lg"
      style={{
        backgroundColor: status_kode === STATUS.TERLAMBAT_AUDITEE ? "rgb(221, 226, 227)" : "rgb(243, 251, 254)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
      }}
    >
      <Row gutter={30}>
        <Col span={8}>
          <Space direction="vertical" size="large">
            <Space
              direction="vertical"
              className="pl-3"
              style={{
                borderLeft: "4px solid #3C64B1"
              }}
            >
              <InfoItem
                title={nama}
              />
              <InfoItem
                title="Batas Waktu"
                desc={batas_waktu ? moment(batas_waktu).format("DD/MM/YYYY") : moment().format("DD/MM/YYYY")}
              />
              <InfoItem
                title="Status"
                desc={nama_status}
              />
            </Space>
            <Space
              direction="vertical"
            >
              <InfoItem
                title="Checker"
                desc={logChecker.length > 0 ? logChecker.map((l, i) => (
                  <Person key={i} nama={l.from.nama} pn={l.from.pn} alasan={`"${l.note}"`} />
                )) : <p>No log yet</p>}
              />
              <InfoItem
                title="Signer"
                desc={logSigner.length > 0 ? logSigner.map((l, i) => (
                  <Person key={i} nama={l.from.nama} pn={l.from.pn} alasan={`"${l.note}"`} />
                )) : <p>No log yet</p>}
              />
            </Space>
          </Space>
        </Col>
        <Col span={16}>
          {table}
        </Col>
      </Row>
    </div>
  )
}

const InfoItem = ({ title, desc }) => {
  return (
    <div>
      <p
        className="font-bold"
        style={{
          color: "#3C64B1"
        }}
      >
        {title}
      </p>
      <div>{desc}</div>
    </div>
  )
}

const Person = ({ avatarUrl, nama, pn, alasan }) => {
  return (
    <div className="flex items-center gap-2 py-2">
      <Avatar src={avatarUrl} />
      <div className="font-semibold flex flex-col leading-4">
        <p>{nama}</p>
        <p>{pn}</p>
      </div>
      <p className="w-full flex-1 self-start">{alasan}</p>
    </div>
  )
}