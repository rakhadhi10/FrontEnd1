import { Button, Radio, Select, Space, Typography } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setNonPATProjectType } from "../../../../../store/ducks/EWP/CreateEWP/actions";

function NonPAT({ setNonPATProjectType, onNext, onPrev }) {
  const [currVal, setCurrVal] = useState("SA");

  const handleOnChange = (e) => {
    setCurrVal(e.target.value);
  };

  const handleOnNext = () => {
    setNonPATProjectType(currVal);
    onNext();
  };

  return (
    <>
      <Typography.Title level={3} style={{ color: "#FE9843" }}>
        Non PAT
      </Typography.Title>
      <section className="border border-primary-blue p-12 my-12 rounded-lg">
        <Radio.Group onChange={handleOnChange} value={currVal} size="large">
          <Space direction="vertical" size="large">
            <Radio value="SA">
              <p
                style={{ color: currVal === "SA" ? "#3C64B1" : "#999B9D" }}
                className="text-2xl font-semibold"
              >
                Special Audit
              </p>
            </Radio>
            <Radio value="TMT">
              <div className="flex items-center gap-4">
                <p
                  style={{
                    color: currVal === "TMT" ? "#3C64B1" : "#999B9D",
                  }}
                  className="text-2xl font-semibold"
                >
                  Tematik Audit
                </p>
                <Select
                  placeholder="Select tema audit"
                  disabled={currVal !== "TMT"}
                />
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </section>
      <div className="flex justify-end space-x-2">
        <Button onClick={onPrev}>Previous</Button>
        <Button
          type="primary"
          onClick={handleOnNext}
          disabled={currVal === null}
        >
          Next
        </Button>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  setNonPATProjectType: setNonPATProjectType,
};

export default connect(null, mapDispatchToProps)(NonPAT);
