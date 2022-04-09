import { Button, Form, Input, Select } from "antd";
import { connect } from "react-redux";
import { fetchPATs, updateFilterForm } from "../../../store/ducks/CreatePAT/actions";

const { Option } = Select

function SearchForm({ updateFilter, fetchPATs }) {
  return (
    <Form name="search_pat" onValuesChange={(_, allVal) => updateFilter(allVal)}>
      <div className="grid grid-cols-3 gap-8">
        <Form.Item name="name" className="m-0">
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item name="jangka_tahun" className="m-0">
          <Select placeholder="Pilih jangka tahun">
            <Option></Option>
          </Select>
          {/* <DatePicker.RangePicker
            picker="year"
          /> */}
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item shouldUpdate className="m-0">
            {({ getFieldsValue }) => {
              const { name, jangka_tahun} = getFieldsValue();
              const isAnyFilled = name || jangka_tahun
              return (
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  disabled={!isAnyFilled}
                  onClick={() => fetchPATs()}
                >
                  Search
                </Button>
              );
            }}
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-end"></div>
    </Form>
  );
}

const mapDispatchToProps = {
  updateFilter: updateFilterForm,
  fetchPATs: fetchPATs
}

export default connect(null, mapDispatchToProps)(SearchForm)
