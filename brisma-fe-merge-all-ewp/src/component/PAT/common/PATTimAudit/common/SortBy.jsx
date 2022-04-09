import { Select } from "antd";

const { Option } = Select;

export default function SortBy({ updateSortBy }) {
  return (
    <Select
      allowClear
      className="w-48"
      placeholder="Sort by"
      onChange={(value) => updateSortBy(value)}
    >
      <Option value="name ASC">
        Nama Tim - Ascending
      </Option>
      <Option value="name DESC">
        Nama Tim - Descending
      </Option>
      <Option value="nama_pic ASC">
        Maker - Ascending
      </Option>
      <Option value="nama_pic DESC">
        Maker - Descending
      </Option>
    </Select>
  );
}