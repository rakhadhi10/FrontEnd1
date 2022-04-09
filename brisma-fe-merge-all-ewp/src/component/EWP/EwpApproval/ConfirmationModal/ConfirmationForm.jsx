import React from "react";
import { Form, Input, Button, Modal } from "antd";
import DebounceAuditor from "../../../AutoComplete/DebounceAuditor";
import { postApprovalEwp } from "../../../../store/ducks/EWP/Approval/selectors";
import { connect } from "react-redux";
import { compose } from "redux";

const { TextArea } = Input;

export const ConfirmationForm = ({ type, onCancel, loading }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
  };
  return (
    <div className="py-4 flex justify-center">
      <div
        className={`flex-col flex justify-center w-2/3 ${
          type === "approve" ? "text-primary-green" : "text-primary-red"
        }`}
      >
        <p className=" text-3xl capitalize w-full border-b-2 py-4 flex justify-center border-gray-400 mb-8">
          {type}
        </p>
        <Form labelCol={{ span: 5 }} form={form} onFinish={onFinish}>
          {type === "approve" ? (
            <>
              <div className="text-2xl text-primary-gray">Alasan Approve</div>
              <Form.Item name="approval_desc" shouldUpdate>
                <TextArea rows={4} className="bg-gray-100" />
              </Form.Item>
            </>
          ) : type === "reject" ? (
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-2xl text-primary-gray">Alasan Reject</div>
                <Form.Item name="approval_desc" shouldUpdate>
                  <TextArea rows={4} className="bg-gray-100" />
                </Form.Item>
              </div>
              <div>
                <div className="text-2xl text-primary-gray">
                  Ketua Tim Audit Yang dikehendaki
                </div>
                <Form.Item name="kta" shouldUpdate>
                  <DebounceAuditor
                    placeholder="Ketik Nama atau PN"
                    disabled={loading}
                  />
                </Form.Item>
              </div>
              <div className="border border-primary-yellow text-secondary-yellow rounded-md p-3">
                Sistem Akan Mengirimkan Notifikasi Kepada Calon Ketua TIm Audit
                yang dikehendaki untuk merealisasikan Project EWP tersebut
              </div>
              {/* <div className="flex flex-col gap-4">
                <div>
                  <div className="text-2xl text-primary-gray">
                    Catatan untuk PIC
                  </div>
                  <TextArea rows={4} className="bg-gray-100" />
                </div>
              </div> */}
            </div>
          ) : type === "send to pic" ? (
            <>
              <div className="text-2xl text-primary-gray">
                Catatan untuk PIC
              </div>
              <TextArea rows={4} className="bg-gray-100" />
            </>
          ) : type === "send approval" ? (
            <div className="text-2xl text-gray-300 flex justify-center">
              Apakah anda yakin “Send approval” kepada KTA ?
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-row gap-4 justify-end my-8">
            <Button onClick={onCancel} type="primary" danger>
              No
            </Button>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Yes
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
