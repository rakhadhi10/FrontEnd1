import { Modal, Typography } from "antd";
import React from "react";
import AnalisaAktivitas from "./AnalisaAktivitas/AnalisaAktivitas";

export default function CreateAnalisaAktivitasModal({ onCancel, visible, data }) {
  return (
    <Modal
      onCancel={onCancel}
      destroyOnClose
      visible={visible}
      centered
      width={1000}
      maskClosable={false}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={"text-gray-700"}>Analisis Aktivitas</span>
        </Typography.Title>,
      ]}
    >
      <AnalisaAktivitas data={data} />
    </Modal>
  );
}
