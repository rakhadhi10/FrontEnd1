import { CheckOutlined } from "@ant-design/icons";

export default function Approver({ checkers }) {
  console.log(checkers);
  return (
    <div className="space-y-1">
      <div className="flex gap-2 font-mulish items-center">
        <p className="font-bold text-lg">Manager Audit:</p>
        <p>{checkers.ma.pn_auditor + " - " + checkers.ma.nama_auditor}</p>
        <p>
          {checkers.status === "final" || checkers.status === "on KAI" ? (
            <>
              [<CheckOutlined className="text-lg text-primary-green" />]
            </>
          ) : (
            "[  ]"
          )}
        </p>
      </div>
      <div className="flex gap-2 font-mulish items-center">
        <p className="font-bold text-lg">Kepala Tim Audit:</p>
        <p>{checkers.kta.pn_auditor + " - " + checkers.kta.nama_auditor}</p>
        <p>
          {checkers.status === "on MA" ||
          checkers.status === "on KAI" ||
          checkers.status === "final" ? (
            <>
              [<CheckOutlined className="text-lg text-primary-green" />]
            </>
          ) : (
            "[  ]"
          )}
        </p>
      </div>
      <div className="flex gap-2 font-mulish items-center">
        <p className="font-bold text-lg">Kepala Audit:</p>
        <p>{checkers.kai.pn_auditor + " - " + checkers.kai.nama_auditor}</p>
        <p>
          {checkers.status === "final"
            ? "[" +
              (
                <>
                  <CheckOutlined className="text-lg text-primary-green" />
                </>
              ) +
              "]"
            : "[  ]"}
        </p>
      </div>
    </div>
  );
}
