import { Select } from "antd";

const { Option } = Select;

export default function SortBy({ updateSortBy }) {
  return (
    <Select
      allowClear
      placeholder="Sort by"
      style={{ minWidth: "20%" }}
      onChange={(value) => updateSortBy(value)}
    >
      <Option key="1" value="sbp_name ASC">Nama SBP - Ascending</Option>
      <Option key="2" value="sbp_name DESC">Nama SBP - Descending</Option>
      <Option key="3" value="orgeh_name ASC">Nama Uker - Ascending</Option>
      <Option key="4" value="orgeh_name DESC">Nama Uker - Descending</Option>
      <Option key="5" value="nama_pic_maker_jadwal_sbp ASC">Nama Maker - Ascending</Option>
      <Option key="6" value="nama_pic_maker_jadwal_sbp DESC">Nama Maker - Descending</Option>
      <Option key="7" value="pelaksanaan_start ASC">Mulai Pelaksanaan - Ascending</Option>
      <Option key="8" value="pelaksanaan_start DESC">Mulai Pelaksanaan - Descending</Option>
      <Option key="9" value="pelaksanaan_end ASC">Selesai Pelaksanaan - Ascending</Option>
      <Option key="10" value="pelaksanaan_end DESC">Selesai Peleksanaan - Descending</Option>
      <Option key="11" value="total_anggaran ASC">Total Anggaran - Ascending</Option>
      <Option key="12" value="total_anggaran DESC">Total Anggaran - Descending</Option>
    </Select>
  );
}