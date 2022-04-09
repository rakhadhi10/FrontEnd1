import { Select } from "antd";

const { Option } = Select;

export default function SortBy({ updateSortBy }){
  return (
    <Select
      allowClear
      placeholder="Sort by"
      style={{minWidth: "20%"}}
      onChange={(value) => updateSortBy(value)}
    >
      <Option key="1" value="tipe_audit_kode ASC">Tipe Audit - Ascending</Option>
      <Option key="2" value="tipe_audit_kode DESC">Tipe Audit - Descending</Option>
      <Option key="3" value="nama_kegiatan ASC">Nama Kegiatan - Ascending</Option>
      <Option key="4" value="nama_kegiatan DESC">Nama Kegiatan - Descending</Option>
      <Option key="5" value="nama_pic_jadwal_audit ASC">Nama Maker - Ascending</Option>
      <Option key="6" value="nama_pic_jadwal_audit DESC">Nama Maker - Descending</Option>
      <Option key="7" value="total_anggaran ASC">Total Anggaran - Ascending</Option>
      <Option key="8" value="total_anggaran DESC">Total Anggaran - Descending</Option>
      <Option key="9" value="tim_audit_name ASC">Nama Tim Audit - Ascending</Option>
      <Option key="10" value="tim_audit_name DESC">Nama Tim Audit - Descending</Option>
      <Option key="11" value="pelaksanaan_start ASC">Mulai Pelaksanaan - Ascending</Option>
      <Option key="12" value="pelaksanaan_start DESC">Mulai Pelaksanaan - Descending</Option>
      <Option key="13" value="pelaksanaan_end ASC">Selesai Pelaksanaan - Ascending</Option>
      <Option key="14" value="pelaksanaan_end DESC">Selesai Peleksanaan - Descending</Option>
    </Select>
  );
}