import React from "react";
import { Modal, Tabs, Typography } from "antd";
import { DaftarPnPenyebab } from "./TabPnPenyebab/DaftarPnPenyebab";
import { ListPnPenyebab } from "./TabPnPenyebab/ListPnPenyebab";

const { TabPane } = Tabs;

export const PnPenyebabModal = ({ visible, onSave, onCancel, value, onDelete, datapn }) => {





  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
      title={[
        <Typography.Title level={2} className="text-center">
          Pn Penyebab
        </Typography.Title>,
      ]}
      width={1000}
      centered
    >
      <Tabs defaultValue={1} centered>
        <TabPane tab="Daftar Pn Penyebab" key={1}>
          <DaftarPnPenyebab handleOnSave={onSave} />
        </TabPane>
        <TabPane tab="List Pn Penyebab" key={2}>
          <ListPnPenyebab data={datapn} onDelete={onDelete} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
