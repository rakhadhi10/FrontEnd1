import { Select } from "antd";

const { Option } = Select;

export default function SortBy({ updateSortBy }) {
  return (
    <Select
      allowClear
      className="w-1/5"
      placeholder="Sort by"
      onChange={(value) => updateSortBy(value)}
    >
      <Option value="nama ASC">
        Nama - Ascending
      </Option>
      <Option value="nama DESC">
        Nama - Descending
      </Option>
      <Option value="pic ASC">
        Maker - Ascending
      </Option>
      <Option value="pic DESC">
        Maker - Descending
      </Option>
      <Option value="pelaksanaan_start ASC">
        Mulai Pelaksanaan - Ascending
      </Option>
      <Option value="pelaksanaan_start DESC">
        Mulai Pelaksanaan - Descending
      </Option>
      <Option value="pelaksanaan_end ASC">
        Selesai Pelaksanaan - Ascending
      </Option>
      <Option value="pelaksanaan_end DESC">
        Selesai Pelaksanaan - Descending
      </Option>
      <Option value="total_anggaran ASC">
        Total Anggaran - Ascending
      </Option>
      <Option value="total_anggaran DESC">
        Total Anggaran - Descending
      </Option>
    </Select>
  );
}