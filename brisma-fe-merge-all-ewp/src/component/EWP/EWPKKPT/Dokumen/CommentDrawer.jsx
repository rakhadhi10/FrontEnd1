import PropTypes from "prop-types";
import { Drawer, Space, Typography } from "antd";
import { CloseOutlined, FolderAddOutlined } from "@ant-design/icons";
import CommentSectionReply from "./CommentSectionReply";
import AddNewComment from "./AddNewComment";
import { useState } from "react";

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

export default function CommentDrawer({ visible, sections, onClickClose }) {
  const [newComment, setNewComment] = useState(false);

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
          <AddNewComment nama="1942 - Fafifu" onClose={() => setNewComment(false)} />
        </div>
      )}
      <Space direction="vertical" className="w-full">
        {[...Array(3)].map((_, idx) => {
          return <CommentSectionReply key={idx} comments={mockComments} />;
        })}
      </Space>
    </Drawer>
  );
}

CommentDrawer.propTypes = {
  sections: PropTypes.array,
  onClickAdd: PropTypes.func,
  onClickClose: PropTypes.func,
};

CommentDrawer.propTypes = {
  sections: [],
  onClickAdd: () => null,
  onClickClose: () => null,
};
