import { Button, Tabs } from "antd";
import React, { useEffect, memo } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { CardInfoKKPT, MergeHistoryTab, MergeKKPTTab } from "../../../../component/EWP/EWPKKPT";
import EWPLayout from "../../../../layouts/EwpLayout";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { compose } from "redux";
import { connect } from "react-redux";
import { getListKkpt, mergeKkpt, getHistory } from '../../../../store/ducks/EWP/Kkpt/kkptmerge/action'
import { useParams } from "react-router";
const { TabPane } = Tabs;

const breadcrumb = [
  {
    title: "BRISMA",
    link: "/",
  },
  {
    title: "EWP",
    link: "/dashboard",
  },
  {
    title: "20210011",
    link: "/ewp/project",
  },
  {
    title: "KKPT",
    link: "/ewp/project/kkpt",
  },
  {
    title: "Merge",
    link: "/ewp/project/kkpt/merge",
  },
];

export function KKPTMerge({ kkptList, getListKkpt, mergeKkpt, getHistory }) {
  const { messageCreate } = kkptList
  const { project_id } = useParams();


  useEffect(() => {
    getHistory(project_id)
    getListKkpt(project_id)
  }, [])


  const handleMerge = async (data) => {
    // alert(JSON.stringify(data))
    let res = await mergeKkpt(data)
    console.log(res)
  }

  return (
    <EWPLayout selectedKey="5">
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="">
        <CardProjectEWP />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Merge</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>

      <Tabs defaultActiveKey={1} centered className="w-full">
        <TabPane key={1} tab="Merging KKPT">
          <MergeKKPTTab dataList={kkptList.dataList} handleMerge={handleMerge} messageMerge={messageCreate} />
        </TabPane>
        <TabPane key={2} tab="History">
          <MergeHistoryTab dataListHistory={kkptList.dataHistory} />
        </TabPane>
      </Tabs>
    </EWPLayout>
  );
}


const mapStateToProps = (state) => {


  return { kkptList: state.kkpt_merge }
};

const mapDispatchToProps = {
  getListKkpt,
  mergeKkpt,
  getHistory
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTMerge);
