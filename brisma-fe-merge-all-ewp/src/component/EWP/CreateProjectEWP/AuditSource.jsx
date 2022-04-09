import { Button, Radio, Typography } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuditSource } from "../../../store/ducks/EWP/CreateEWP/actions";

function AuditSource({ onNext, setAuditSource }) {
  const [radioVal, setradioVal] = useState("pat");

  const handleOnNext = () => {
    setAuditSource(radioVal);
    onNext();
  };

  return (
    <div className="space-y-4">
      <Radio.Group
        defaultValue={radioVal}
        onChange={(e) => setradioVal(e.target.value)}
        className="grid grid-cols-2 m-8 my-20"
      >
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <img src="/select-pat.png" alt="PAT" />
            <Typography.Title
              level={2}
              style={{ margin: 0, padding: 0, color: "#3BAAA4" }}
            >
              PAT
            </Typography.Title>
          </div>
          <Radio value="pat" />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <img src="/select-non-pat.png" alt="PAT" />
            <Typography.Title
              level={2}
              style={{ margin: 0, padding: 0, color: "#FE9843" }}
            >
              NON PAT
            </Typography.Title>
          </div>
          <Radio value="nonpat" />
        </div>
      </Radio.Group>
      <div className="flex justify-end">
        <Button type="primary" onClick={handleOnNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setAuditSource: setAuditSource,
};

export default connect(null, mapDispatchToProps)(AuditSource);
