import { CheckOutlined } from "@ant-design/icons";

export default function SignerStatus({ signers }) {
  return (
    <div>
      <p className="font-semibold">Signer</p>
      {signers.map(item => {
        const { pn, nama, status } = item
        return (
          <div className="flex flex-wrap gap-2">
            <p className="text-primary-blue font-semibold">{pn} - {nama}</p>
            {status === "Approved" && <div>[<CheckOutlined className="text-primary-green" />]</div>}
          </div>
        )
      })}
    </div>
  );
}

SignerStatus.defaultProps = {
  signers: []
}