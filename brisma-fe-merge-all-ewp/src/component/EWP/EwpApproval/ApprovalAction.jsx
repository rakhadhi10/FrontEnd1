import React from "react";
import { Modal, Typography } from "antd";
import PenggantianKTA from "./PenggantianKTA";

export const ApprovalAction = ({ visible, handleOnOk, handleOnCancel }) => {
  return (
    <>
      <Modal
        visible={visible}
        width="1200px"
        centered
        onOk={handleOnOk}
        onCancel={handleOnCancel}
        footer={null}
        title={[
          <Typography.Title level={2} className="ewp-modal-title">
            EWP Approval
          </Typography.Title>,
        ]}
      >
        <PenggantianKTA onCancel={handleOnCancel} />
      </Modal>
    </>
  );
};
