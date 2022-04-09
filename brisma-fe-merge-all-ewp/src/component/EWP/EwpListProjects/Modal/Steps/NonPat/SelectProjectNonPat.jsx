import { Typography, Radio, Space, Select } from "antd";
import { useState } from "react";

export default function SelectProjectNonPat(props) {
  const [currVal, setCurrVal] = useState("special");

  const handleOnChange = (e) => {
    setCurrVal(e.target.value);
  };

  return (
    <>
      <Typography.Title level={3} style={{ color: "#FE9843" }}>
        Non PAT
      </Typography.Title>
      <section className="border border-primary-blue p-12 my-12 rounded-lg">
        <Radio.Group onChange={handleOnChange} value={currVal} size="large">
          <Space direction="vertical" size="large">
            <Radio value="special">
              <p
                style={{ color: currVal === "special" ? "#3C64B1" : "#999B9D" }}
                className="text-2xl font-semibold"
              >
                Special Audit
              </p>
            </Radio>
            <Radio value="tematik">
              <div className="flex items-center gap-4">
                <p
                  style={{
                    color: currVal === "tematik" ? "#3C64B1" : "#999B9D",
                  }}
                  className="text-2xl font-semibold"
                >
                  Tematik Audit
                </p>
                <Select
                  placeholder="Select tema audit"
                  disabled={currVal !== "tematik"}
                />
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </section>
    </>
  );
}
