import { Button, Select } from "antd";
import React, { useState } from "react";
import { compose } from "redux";
import { CreateProjectEWP } from "../../../component/EWP/CreateProjectEWP";
import BodyListProject from "../../../component/EWP/EwpListProjects/BodyListProject";
import FilterForm from "../../../component/EWP/EwpListProjects/FilterForm";
import AppLayout from "../../../layouts/AppLayout";
import { pat_content } from "../../routes/allowedRoles";
import withAuth from "../../routes/hoc/withAuth";
import withRole from "../../routes/hoc/withRole";

function EWPListProject() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <AppLayout title="EWP">
      <CreateProjectEWP
        visible={modalVisible}
        handleCancel={() => setModalVisible(false)}
      />
      <div className="p-6 my-4 bg-white">
        <FilterForm />
      </div>
      <div className="py-4 flex justify-between items-center">
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Create Project EWP
        </Button>
        <Select className="w-48" placeholder="Sort by" allowClear />
      </div>
      <BodyListProject modalVisible={modalVisible} />
    </AppLayout>
  );
}

export default compose(withAuth, withRole(pat_content))(EWPListProject);
