import { Button, Select } from "antd";
import { connect } from "react-redux";
import CardPATList from "../../../component/reference/create-pat/CardPATList";
import ModalCreatePAT from "../../../component/reference/create-pat/ModalCreatePAT";
import SearchForm from "../../../component/reference/create-pat/SearchForm";
import AppLayout from "../../../layouts/AppLayout";
import { openModal, updateSortBy } from "../../../store/ducks/CreatePAT/actions";

function CreatePAT({ openCreateModal, updateSortBy }) {
  return (
    <AppLayout title="REFERENCE">
      <ModalCreatePAT />
      <div className="bg-white p-4 my-4">
        <SearchForm />
      </div>
      <div className="my-8 flex justify-between items-center">
        <Button type="primary" onClick={openCreateModal}>
          Create PAT
        </Button>
        <Select 
          className="w-48" 
          placeholder="Sort by" 
          allowClear 
          onChange={(val) => updateSortBy(val)}
        />
      </div>
      <CardPATList />
    </AppLayout>
  );
}

const mapDispatchToProps = {
  openCreateModal: openModal,
  updateSortBy: updateSortBy
}

export default connect(null, mapDispatchToProps)(CreatePAT)