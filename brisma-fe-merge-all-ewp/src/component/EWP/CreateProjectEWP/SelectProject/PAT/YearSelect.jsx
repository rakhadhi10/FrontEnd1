import { Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import { fetchPats } from "../../../../../store/ducks/EWP/CreateEWP/actions";

const { Option } = Select;

function YearSelect({ fetchPAT }) {
  return (
    <div className="flex space-x-2">
      <p className="text-primary-blue">Select year</p>
      <Select
        style={{ minWidth: 180 }}
        placeholder="Select Year"
        onChange={(value) => fetchPAT({ tahun: value })}
      >
        <Option value="2019">2019</Option>
        <Option value="2020">2020</Option>
        <Option value="2021">2021</Option>
        <Option value="2022">2022</Option>
        <Option value="2023">2023</Option>
        <Option value="2024">2024</Option>
      </Select>
    </div>
  );
}

const mapDispatchToProps = {
  fetchPAT: fetchPats,
};

export default connect(null, mapDispatchToProps)(YearSelect);
