import { Modal, Typography, Spin } from "antd";
import TabsAssign from "./TabsAssign";

export const validateAuditor = (rule, value) => {
  const error = !value || !value.pn || !value.nama || !value.jabatan;
  if (error) {
    return Promise.reject(new Error("Please select from the provided options"));
  } else {
    return Promise.resolve();
  }
};

export const ModalAssign = (props) => {
  return (
    <Modal
      visible={props.visible}
      width={1000}
      onCancel={props.onCancel}
      footer={null}
      centered
      title={[
        <Typography.Title level={3} className="text-center">
          Assign Project
        </Typography.Title>,
      ]}
    >
      {props.loading &&
        <div className="flex justify-center"><Spin /></div>
      }
      {!props.loading && props.initialValues &&
        <TabsAssign {...props} />
      }
    </Modal>
  );
};


export default ModalAssign