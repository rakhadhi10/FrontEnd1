import { Tree } from "antd";
import { memo } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { fetchKkptDetail } from "../../../../../store/ducks/EWP/Kkpt/kkptdetail/action"
import { getDataDocKkpt } from "../../../../../store/ducks/EWP/Kkpt/kkptdata/action"
import { fetchAllDataComment } from "../../../../../store/ducks/EWP/Kkpt/kkptcomment/action"

const TreeKKPT = ({ data = [], fetchKkptDetail, getDataComment, getDataDocKkpt }) => {



  const onSelect = (selectedKeys, info) => {
    let id_kkpt = info.node.id_kkpt
    if (id_kkpt != undefined) {
      fetchKkptDetail(id_kkpt)
      getDataComment(id_kkpt, 2)
      getDataDocKkpt(id_kkpt)
    }
  };

  return <Tree
    treeData={data}
    onSelect={onSelect}
    defaultExpandedKeys={["1-1-1-1-1-1-1"]}
    defaultSelectedKeys={["1-1-1-1-1-1-1"]}
  />;
};


const mapStateToProps = (state) => ({
  stateKkptDetail: state.kkpt_detail

});

const mapDispatchToProps = {
  fetchKkptDetail,
  getDataComment: fetchAllDataComment,
  getDataDocKkpt
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(TreeKKPT);
