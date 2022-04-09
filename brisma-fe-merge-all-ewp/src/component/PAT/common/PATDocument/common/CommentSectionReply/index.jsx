import { useState } from "react";
import { connect } from "react-redux";
import { Button, Collapse, Space } from "antd";
import Reply from "../../common/Reply";
import Comment from "../../common/Comment";
import { getUserName, getUserPN } from "../../../../../../store/ducks/auth/selectors";
import "./CommentSectionReply.css";

function CommentSectionReply({ comments, nama, reply, closeComment }) {
  const [editing, setEditing] = useState(false)

  return (
    <Collapse
      bordered
      ghost
      defaultActiveKey={"1"}
      expandIconPosition="right"
      style={{ border: "1px solid black", borderRadius: "0.5rem" }}
    >
      <Collapse.Panel
        header={<span className="font-semibold ">&nbsp;</span>}
        key="1"
        id="comment-panel"
        className="w-full"
        style={{ backgroundColor: comments.some(c => c.selesai) && "#EBEBEB", borderRadius: "0.5rem" }}
      >
        <Space
          direction="vertical"
          className="w-full"
          split={<div className="border-b border-gray-400" />}
        >
          {comments.map(item => {
            return (
              <Comment
                nama={item.nama}
                waktu={item.waktu}
                komentar={item.komentar}
              />
            )
          })}
          {editing && !comments.some(c => c.selesai) &&
            <Reply
              nama={nama}
              reply={reply}
              parentId={comments[0].id}
              onCancel={() => setEditing(false)}
            />
          }
          {!editing && !comments.some(c => c.selesai) &&
            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditing(true)}>Tambah Komentar</Button>
              <Button type="primary" onClick={() => closeComment(comments[0].id)}>Tandai Sudah Selesai</Button>
            </div>
          }
        </Space>
        {comments.some(c => c.selesai) && <p className="font-semibold text-center italic">Komentar ditandai Selesai</p>}
      </Collapse.Panel>
    </Collapse>
  );
}

const mapStateToProps = state => ({
  nama: `${getUserPN(state)} - ${getUserName(state)}`
})

export default connect(mapStateToProps)(CommentSectionReply)