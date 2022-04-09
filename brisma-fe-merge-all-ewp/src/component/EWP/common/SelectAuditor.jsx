/* eslint-disable array-callback-return */
import { Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getCurrentProjectLoading,
  getCurrentTimAudit,
} from "../../../store/ducks/EWP/CreateEWP/selectors";

const { Option } = Select;

function SelectAuditor({ tim_audit, loading, onChange }) {
  const [listTimAudit, setlistTimAudit] = useState([]);

  useEffect(() => {
    let temp = [];
    temp.push({
      pn: tim_audit.kta.pn,
      nama: tim_audit.kta.nama,
    });
    tim_audit.ata &&
      tim_audit.ata.map((item) => {
        temp.push({
          pn: item.pn,
          nama: item.nama,
        });
      });

    setlistTimAudit(temp);
  }, [tim_audit]);

  return (
    <Skeleton active loading={loading} paragraph={false}>
      <Select
        labelInValue
        onChange={onChange}
        allowClear
        defaultActiveFirstOption={false}
        placeholder="Select Auditor"
        className="w-full"
      >
        {listTimAudit.map((item) => (
          <Option key={item.pn} value={item.nama}>
            {item.pn + " - " + item.nama}
          </Option>
        ))}
      </Select>
    </Skeleton>
  );
}

const mapStateToProps = (state) => {
  return {
    tim_audit: getCurrentTimAudit(state),
    loading: getCurrentProjectLoading(state),
  };
};

export default connect(mapStateToProps, null)(SelectAuditor);
