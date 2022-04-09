import { CheckOutlined } from "@ant-design/icons";

export default function CheckerStatus({ checkers }) {
  return (
    <div>
      <p className="font-semibold">Checker</p>
      {checkers.map(item => {
        const { pn, nama, status } = item
        return (
          <div key={pn} className="flex flex-wrap gap-2">
            <p className="text-primary-blue font-semibold">{pn} - {nama}</p>
            {status === "Approved" && <div>[<CheckOutlined className="text-primary-green" />]</div>}
          </div>
        )
      })}
    </div>
  );
}

CheckerStatus.defaultProps = {
  checkers: []
}