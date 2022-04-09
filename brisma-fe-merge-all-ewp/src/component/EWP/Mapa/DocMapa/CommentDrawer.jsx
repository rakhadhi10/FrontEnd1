import PropTypes from "prop-types";
import { Drawer, Space, Typography } from "antd";
import { CloseOutlined, FolderAddOutlined } from "@ant-design/icons";
import CommentSectionReply from "./CommentSectionReply";
import AddNewComment from "./AddNewComment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getDataKomen,
  getErrorKomen,
  getLoadingKomen,
} from "../../../../store/ducks/EWP/Mapa/Dokumen/selectors";
import { fetchKomenMapaDokumen } from "../../../../store/ducks/EWP/Mapa/Dokumen/actions";
import { useParams } from "react-router-dom";

const mockComments = [
  {
    nama: "1942 - Fafifu",
    waktu: "21 Okt 2021 17:54",
    komentar: "itu di redaksinya masih belom sesuai, tolong diperbaiki ya plis banget makasihh",
  },
  {
    nama: "1942 - Fafifu",
    waktu: "21 Okt 2021 17:54",
    komentar: "itu di redaksinya masih belom sesuai, tolong diperbaiki ya plis banget makasihh",
  },
  {
    nama: "1942 - Fafifu",
    waktu: "21 Okt 2021 17:54",
    komentar: "itu di redaksinya masih belom sesuai, tolong diperbaiki ya plis banget makasihh",
  },
];

function CommentDrawer({
  visible,
  bab_id,
  onClickClose,
  dataComments,
  loading,
  error,
  fetchKomen,
}) {
  const [newComment, setNewComment] = useState(false);
  const { project_id } = useParams();

  useEffect(() => bab_id && fetchKomen(project_id, bab_id), [fetchKomen, project_id, bab_id]);
  console.log(dataComments);
  return (
    <Drawer
      title={
        <div className="flex flex-wrap justify-between">
          <Typography.Title level={4}>Comments</Typography.Title>
          <div className="flex gap-4">
            <FolderAddOutlined
              className="text-lg cursor-pointer"
              onClick={() => setNewComment(true)}
            />
            <CloseOutlined
              className="text-primary-red text-lg cursor-pointer"
              onClick={onClickClose}
            />
          </div>
        </div>
      }
      placement="left"
      width={480}
      visible={visible}
      closable={false}
      getContainer={false}
      onClose={onClickClose}
      style={{ position: "absolute" }}
    >
      {newComment && (
        <div className="pb-4">
          <AddNewComment bab_id={bab_id} onClose={() => setNewComment(false)} />
        </div>
      )}
      <Space direction="vertical" className="w-full">
        {!loading &&
          !error &&
          dataComments.map((item, idx) => (
            <CommentSectionReply key={item.id} bab_id={bab_id} dataComments={item} />
          ))}
      </Space>
    </Drawer>
  );
}

const mapStateToProps = (state) => {
  return {
    dataComments: getDataKomen(state),
    loading: getLoadingKomen(state),
    error: getErrorKomen(state),
  };
};

const mapDispatchToProps = {
  fetchKomen: fetchKomenMapaDokumen,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentDrawer);
