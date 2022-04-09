import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState } from "react";
import { Card, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import confirmDelete from "../../../../utils/confirmDelete";
import { getUserPN } from "../../../../../store/ducks/auth/selectors";
import { createErrorNotification, createSuccessNotification } from "../.././../../utils/notifications";
import { getAllStatus, getMakerAddendumPN } from "../../../../../store/ducks/PATProject/selectors";

const MemberTim = ({ img, name, unitKerja, position }) => {
  let color = "";
  switch (position) {
    case "ma":
      color = "text-primary-blue px-2";
      break;
    case "kta":
      color = "text-primary-red px-2";
      break;
    case "ata":
      color = "text-secondary-green px-2";
      break;
    default:
      break;
  }

  return (
    <div className="flex py-1">
      <img
        src={img}
        alt={`${name} ${unitKerja} ${position}`}
        className="w-6 h-6"
      />
      <div className="w-full grid grid-cols-2 gap-2">
        <p className={`${color} text-clip`}>{name}</p>
        <p className="capitalize">{unitKerja ? unitKerja.toLowerCase() : undefined}</p>
      </div>
    </div>
  );
};

const showSuccessNotif = createSuccessNotification("Tim Audit", "Berhasil menghapus tim audit")
const showErrorNotif = createErrorNotification("Tim Audit", "Gagal menghapus tim audit");

const INIT_ROWS_TO_DISPLAY = 5

const CardTimAudit = ({
  isAdendum,

  id,
  name,

  nama_ma,
  pn_ma,
  jabatan_ma,

  nama_kta,
  pn_kta,
  jabatan_kta,

  atas,

  nama_pic,
  pn_pic,
  jabatan_pic,

  onClickEdit,
  onClickDelete,

  canEdit,
}) => {
  const [rowsToDisplay, setRowsToDisplay] = useState(INIT_ROWS_TO_DISPLAY)
  const showMore = () => setRowsToDisplay(atas.length);
  const showLess = () => setRowsToDisplay(INIT_ROWS_TO_DISPLAY)

  return (
    <Card
      title={name}
      headStyle={{ color: isAdendum ? "#ED0000" : "#3C64B1", fontSize: "18px", fontWeight: "700" }}
      extra={canEdit &&
        <div className="flex flex-raw">
          <Button
            icon={<EditOutlined />}
            style={{ border: "none" }}
            onClick={onClickEdit}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            style={{ border: "none" }}
            onClick={confirmDelete(
              "Hapus Tim",
              <div>
                <p className="font-semibold py-4">Apakah anda yakin akan menghapus Tim Audit ini?</p>
                <p className="text-primary-red font-semibold border border-primary-red p-4">
                  Tim audit yang dihapus akan berdampak pada jadwal audit, consulting & kegiatan yang berkaitan dengan tim ini
                </p>
              </div>,
              async () => {
                const success = await onClickDelete(id)
                if (success) showSuccessNotif()
                else showErrorNotif()
              }
            )}
          />
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <MemberTim img="/avatar-0.png" position="ma" name={nama_ma} />
          <MemberTim img="/avatar-1.png" position="kta" name={nama_kta} />
        </div>
        <div>
          {atas.slice(0, rowsToDisplay).map((ata) => (
            <MemberTim
              key={ata.id}
              img="/avatar-2.png"
              position="ata"
              name={ata.name || ata.nama}
              unitKerja={ata.uker && ata.uker[0] ? ata.uker[0].orgeh_name : null}
            />
          ))}
        </div>
        {atas.length > rowsToDisplay &&
          <p
            className="underline cursor-pointer"
            onClick={showMore}
          >
            Show more
          </p>
        }
        {atas.length === rowsToDisplay &&
          <p
            className="underline cursor-pointer"
            onClick={showLess}
          >
            Show less
          </p>
        }
      </div>
      <p className="italic mt-8">
        Maker: {nama_pic}
      </p>
    </Card>
  );
};

CardTimAudit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,

  nama_ma: PropTypes.string,
  pn_ma: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  jabatan_ma: PropTypes.string,

  nama_kta: PropTypes.string,
  pn_kta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  jabatan_kta: PropTypes.string,

  nama_pic: PropTypes.string,
  pn_pic: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  jabatan_pic: PropTypes.string,

  atas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    jabatan: PropTypes.string,
    uker: PropTypes.arrayOf(PropTypes.shape({
      orgeh: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      orgeh_name: PropTypes.string,
      branch: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }))
  })),

  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
}

const mapDispatchToProps = null

const mapStateToProps = (state, ownProps) => {
  const isAddendum = ownProps.addendum
  const userPN = Number(getUserPN(state))
  let canEdit = false


  if (isAddendum) {
    canEdit = userPN === Number(getMakerAddendumPN(state))
  }
  else {
    const isSameMaker = userPN === Number(ownProps.pn_pic)
    const isFinal = getAllStatus(state).status_kode === "7"
    canEdit = !isFinal && isSameMaker
  }
  return { canEdit }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardTimAudit)
