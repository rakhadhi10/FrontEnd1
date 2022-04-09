import { Button, Modal, Typography } from "antd";
import React from "react";
import CommentReasonRejectAnalisa from "./AnalisaAktivitas/CommentReasonRejectAnalisa";

export const CreateModalReasonApproval = ({ visible, onCancel, params }) => {
  console.log(params);
  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      destroyOnClose
      centered
      width={700}
      maskClosable={false}
      footer={
        <Button type="primary" onClick={onCancel}>
          Ok
        </Button>
      }
      title={[
        <Typography.Title level={4} className="text-center">
          <span className={"text-red-400"}>Reason Reject</span>
        </Typography.Title>,
      ]}
    >
      <CommentReasonRejectAnalisa params={params} />
    </Modal>
  );
};
