import { Typography, Select, Space, Divider } from "antd";
import { useEffect } from "react";
import ProjectTable from "./ProjectTable";
import AuditedStats from "./AuditedStats";
import NonAuditedStats from "./NonAuditedStats";
import ProjectFilter from "./ProjectFilter";
import { connect } from "react-redux";
import { fetchPats } from "../../../../../../../store/ducks/EWP/CreateEWP/actions";
import {
  getError,
  getLoading,
  getPats,
  getNamaProjects,
} from "../../../../../../../store/ducks/EWP/CreateEWP/selectors";

const { Option } = Select;
function SelectProjectPat({
  error,
  loading,
  fetchPats,
  dataPat,
  dataRowSelect,
  onChange,
  namaProject,
}) {
  useEffect(() => fetchPats(2019), [fetchPats]);
  const handleChange = (value) => {
    fetchPats(value);
  };
  return (
    <>
      <Space size="small" direction="vertical">
        <Typography.Title level={2} style={{ color: "#3BAAA4", margin: 0 }}>
          PAT
        </Typography.Title>
        <Typography.Title level={3} style={{ margin: 0 }}>
          <span className="text-primary-blue font-normal">{namaProject}</span>
        </Typography.Title>
        <div className="flex flex-wrap gap-4">
          <Typography.Title level={4}>
            <span className="text-primary-blue font-normal">Select Year</span>
          </Typography.Title>
          <Select
            style={{ minWidth: 180 }}
            defaultValue="2019"
            onChange={handleChange}
          >
            <Option value="2019">2019</Option>
            <Option value="2020">2020</Option>
            <Option value="2021">2021</Option>
            <Option value="2022">2022</Option>
            <Option value="2023">2023</Option>
            <Option value="2024">2024</Option>
          </Select>
        </div>
      </Space>
      <section className="border border-primary-blue p-4 rounded-lg">
        <div className="grid grid-cols-4 items-center">
          <div className="flex flex-wrap gap-4">
            <AuditedStats num={10} percent={20} />
            <NonAuditedStats num={30} percent={80} />
            <div className="flex">
              <Divider
                type="vertical"
                dashed
                className="h-full border-secondary-light-black"
              />
            </div>
          </div>
          <div className="col-span-3">
            <ProjectFilter />
          </div>
        </div>
        <div className="p-4 mt-8">
          <ProjectTable data={dataPat} onChangeTable={(e) => onChange(e)} />
        </div>
      </section>
    </>
  );
}
const mapStateToProps = (state) => ({
  error: getError(state),
  loading: getLoading(state),
  dataPat: getPats(state),
  namaProject: getNamaProjects(state),
});

const mapDispatchToProps = {
  fetchPats: fetchPats,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectProjectPat);
