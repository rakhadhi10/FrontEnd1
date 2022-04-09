import { Button, Typography } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserRoleCodes } from "../../../../store/ducks/auth/selectors";
import { createAddendum, fetchStatus } from "../../../../store/ducks/PATProject/actions";
import { getAllStatus } from "../../../../store/ducks/PATProject/selectors";
import { MANAGEMENT_UKA } from "../../../../views/routes/allowedRoles";
import ModalAssignMaker from "./ModalAssignMaker";

function AddendumWarning({ status_pat, riwayat_adendum, user_roles = [], createAddendum, fetchStatus }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [modalVisible, setModalVisible] = useState(false)
  const toggleModal = (visible) => setModalVisible(visible)

  return (
    <div className="border border-dashed border-primary-red rounded-xl px-4 py-6 mt-16 mb-8 flex justify-between items-center gap-4">
      <ModalAssignMaker
        visible={modalVisible}
        onClose={() => toggleModal(false)}
        onSubmit={createAddendum}
        fetchStatus={fetchStatus}
      />
      <Typography.Text type="danger">
        Adendum PAT di inisiasi oleh KTA. Adendum PAT harus dilakukan secara hati-hati karena dapat
        merubah semua inputan yang ada di dalam Modul PAT pada project ini.
      </Typography.Text>
      <Button
        type="danger"
        disabled={status_pat === "Final" && !user_roles.includes(MANAGEMENT_UKA)}
        onClick={() => {
          if (status_pat === "On Adendum") {
            const pathArr = location.pathname.split("/")
            pathArr.splice(-1, 0, "addendum")
            navigate(pathArr.join("/"))
          }
          else {
            toggleModal(true)
          }
        }}
      >
        {status_pat === "On Adendum" ? `Addendum PAT Ke-${riwayat_adendum}` : "Addendum PAT"}
      </Button>
    </div>
  );
}

const mapStateToProps = state => {
  const user_roles = getUserRoleCodes(state)
  const status = getAllStatus(state)
  const status_pat = status.status_pat
  const riwayat_adendum = status.riwayat_adendum
  return { status_pat, riwayat_adendum, user_roles }
}

const mapDispatchToProps = {
  createAddendum: createAddendum,
  fetchStatus: fetchStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(AddendumWarning)