import { Select } from "antd";
import { connect } from "react-redux";
import { updateSortBy } from "../../../../store/ducks/PATListProjects/actions";

const { Option } = Select;

export function SortBy({ updateSortBy }){
  return (
    <Select
      allowClear
      placeholder="Sort by"
      className="min-w-max w-64"
      onChange={(value) => updateSortBy(value)}
    >
      <Option key="1" value="tahun ASC">Tahun - Ascending</Option>
      <Option key="2" value="tahun DESC">Tahun - Descending</Option>
      <Option key="3" value="riwayat_adendum ASC">Adendum - Ascending</Option>
      <Option key="4" value="riwayat_adendum DESC">Adendum - Descending</Option>
      <Option key="5" value="pat_name ASC">Nama PAT - Ascending</Option>
      <Option key="6" value="pat_name DESC">Nama PAT - Descending</Option>
      <Option key="7" value="sp.id ASC">Status Persetujuan - Ascending</Option>
      <Option key="8" value="sp.id DESC">Status Persetujuan - Descending</Option>
      <Option key="9" value="st.id ASC">Status Dokumen - Ascending</Option>
      <Option key="10" value="st.id DESC">Status Dokumen - Descending</Option>
    </Select>
  );
}

const mapDispatchToProps = {
  updateSortBy: updateSortBy
}

export default connect(null, mapDispatchToProps)(SortBy)