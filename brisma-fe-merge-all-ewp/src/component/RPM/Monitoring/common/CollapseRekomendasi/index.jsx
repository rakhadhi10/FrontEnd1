import { Collapse } from "antd";
import { useParams } from "react-router-dom";
import CardsListActionPlan from "../CardsListActionPlan";
import "./CollapseRekomendasi.css";

const { Panel } = Collapse;

export default function CollapseRekomendasi(props) {
  const { kkpt } = props
  const { kkpt_id, id } = useParams()

  return (
    <Collapse
      expandIconPosition="right"
      className="collapse-rekomendasi"
    >
      {
        !kkpt ? [] : kkpt.map((r, idx) => (
          <Panel
            key={idx}
            header={(
              <p className="panel-header">
                {r.nama}
              </p>
            )}
          >
            <CardsListActionPlan
              kkpt_id={kkpt_id}
              project_rpm_id={id}
              rekomendasi_kkpt={{ id: r.id, nama: r.nama }}
              plans={r.action_plan}
              card={props.card}
            />
          </Panel>
        ))
      }
    </Collapse>
  )
}