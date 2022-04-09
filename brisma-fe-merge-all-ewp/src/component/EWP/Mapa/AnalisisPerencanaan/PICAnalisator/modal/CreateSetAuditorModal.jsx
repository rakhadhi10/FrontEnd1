import React from "react";
import { Modal, Typography } from "antd";
import SetAuditorModal from "./SetAuditorModal";

export default function CreateSetAuditorModal({ handleCancel, visible, uker_id, uker }) {
  return (
    <Modal
      onCancel={handleCancel}
      visible={visible}
      centered
      width={1000}
      maskClosable={false}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={"text-gray-700"}>PIC Analisis Mapa</span>
        </Typography.Title>,
      ]}
    >
      <SetAuditorModal uker_id={uker_id} uker={uker} />
    </Modal>
  );
}
