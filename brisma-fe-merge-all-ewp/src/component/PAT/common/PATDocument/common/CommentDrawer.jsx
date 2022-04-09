import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState } from "react";
import { Drawer, Space, Typography } from "antd";
import { CloseOutlined, FolderAddOutlined } from "@ant-design/icons";
import { dateToLogFormat } from "../../../../../utils/momentHelpers";

function CommentDrawer({
  visible,
  sections,
  onClickClose,
  addNewComment: AddNewComment,
  commentSectionReply: CommentSectionReply
}) {
  const [newComment, setNewComment] = useState(false)
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
      style={{ position: 'absolute' }}
    >
      {newComment &&
        <div className="pb-4">
          <AddNewComment
            onClose={() => setNewComment(false)}
          />
        </div>
      }
      <Space direction="vertical" className="w-full">
        {sections.map((c, idx) => {
          return <CommentSectionReply key={idx} comments={c} />
        })}
      </Space>
    </Drawer>
  );
}

const mapStateToProps = (state, ownProps) => {
  const comments = ownProps.getComments(state)
  const test = comments.map(c => {
    return c.map(a => ({
      ...a,
      nama: `${a.pn_create_by} - ${a.nama_create_by}`,
      waktu: dateToLogFormat(a.create_at),
      komentar: a.deskripsi,
      selesai: a.is_closed
    }))
  })
  test.sort((x, y) => x.some(a => a.selesai) - y.some(a => a.selesai))
  return { sections: test }
}

export default connect(mapStateToProps)(CommentDrawer)

CommentDrawer.propTypes = {
  sections: PropTypes.array,
  onClickAdd: PropTypes.func,
  onClickClose: PropTypes.func
}

CommentDrawer.propTypes = {
  sections: [],
  onClickAdd: () => null,
  onClickClose: () => null
}