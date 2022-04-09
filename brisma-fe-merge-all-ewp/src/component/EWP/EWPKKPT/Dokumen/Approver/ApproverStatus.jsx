import { CheckOutlined } from "@ant-design/icons";

export default function ApproverStatus({ approvers }) {
  return (
    <div>
      {approvers.map((item) => {
        const { pn, nama, status, jabatan } = item;
        return (
          <div className="flex flex-wrap gap-4 font-mulish items-center">
            <p className="font-bold text-lg">{jabatan}</p>
            <p>
              {pn} - {nama}
            </p>
            {status === "Approved" && (
              <div>
                [<CheckOutlined className="text-primary-green" />]
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

ApproverStatus.defaultProps = {
  checkers: [],
};
