import { connect } from "react-redux";
import { closeEditModal, submitEditForm } from "../../../../../../store/ducks/PATTimAudit/actions";
import { getEditModal, getFormLoading } from "../../../../../../store/ducks/PATTimAudit/selectors";
import EditTimModal from "../../common/Modal/EditTimModal";
import AddendumTimForm from "./TimForm";

function EditTimModalAddendum({
  addendum,
  editModalVisible,
  editFormLoading,
  closeEditModal,
  submitEditForm,
}) {
  console.log(editModalVisible)
  return (
    <EditTimModal
      visible={editModalVisible}
      handleCancel={closeEditModal}
      addendum={addendum}
    >
      <AddendumTimForm
        buttonLabel="Edit Tim"
        addendum={addendum}
        onSubmit={submitEditForm}
        closeModal={closeEditModal}
        submitting={editFormLoading}
        footer={
          <div>
            <p className="font-semibold">Mohon isi semua data sebelum ke tahap selanjutnya</p>
            <p className="text-secondary-yellow font-semibold border border-secondary-yellow p-4 my-2">
              Tim audit yang diubah akan mereset anggaran yang berelasi pada pekerja tersebut
            </p>
          </div>
        }
      />
    </EditTimModal>
  )
}

const mapDispatchToProps = {
  closeEditModal: closeEditModal,
  submitEditForm: submitEditForm,
}

const mapStateToProps = state => ({
  editModalVisible: getEditModal(state),
  editFormLoading: getFormLoading(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTimModalAddendum)
