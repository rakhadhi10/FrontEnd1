import { connect } from "react-redux";
import { closeCreateModal, submitForm } from "../../../../../../store/ducks/AddendumPATTimAudit/actions";
import { getCreateModal, getFormLoading } from "../../../../../../store/ducks/AddendumPATTimAudit/selectors";
import CreateTimModal from "../../common/Modal/CreateTimModal";
import AddendumTimForm from "./TimForm";

function CreateTimModalAddendum({
  addendum,
  createModalVisible,
  createFormLoading,
  closeCreateModal,
  submitCreateForm,
}) {
  return (
    <CreateTimModal
      visible={createModalVisible}
      handleCancel={closeCreateModal}
      addendum={addendum}
    >
      <AddendumTimForm
        buttonLabel="Buat Tim"
        addendum={addendum}
        onSubmit={submitCreateForm}
        closeModal={closeCreateModal}
        submitting={createFormLoading}
        footer={
          <p className="font-semibold">
            Mohon isi semua data sebelum ke tahap selanjutnya
          </p>
        }
      />
    </CreateTimModal>
  )
}

const mapDispatchToProps = {
  closeCreateModal: closeCreateModal,
  submitCreateForm: submitForm,
}

const mapStateToProps = state => ({
  createModalVisible: getCreateModal(state),
  createFormLoading: getFormLoading(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTimModalAddendum)
