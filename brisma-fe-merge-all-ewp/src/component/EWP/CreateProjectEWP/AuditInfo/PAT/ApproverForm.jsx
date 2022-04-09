import { Form } from "antd";
import React from "react";
import DebounceAuditor from "../../../../AutoComplete/DebounceAuditor";

export const ApproverForm = ({ form }) => {
  return (
    <div className="p-8">
      <p>
        Ketua Tim yang anda pilih berbeda dengan Ketua Tim yang ada didalam PAT
        pada project tersebut. Anda harus meminta approver kepada pejabat UKA
        minimal eselon 2.
      </p>
      <div className="flex">
        <Form form={form}>
          <Form.Item
            name="nama_approval"
            label="Nama Approval"
            labelAlign="left"
            extra="Manager Audit atau Kepala Audit Intern yang berkenan untuk memberi Approval."
            required
          >
            <DebounceAuditor placeholder="Ketik Nama atau PN" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
