import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Collapse, Space } from "antd";
import Reply from "../Reply";
import Comment from "../Comment";
import "./CommentSectionReply.css";

export default function CommentSectionReply({ selesai, comments }){
  const [editing, setEditing] = useState(false)

  return (
    <Collapse
      expandIconPosition="right"
      bordered
      ghost
      style={{ border: "1px solid black", borderRadius: "0.5rem" }}
    >
      <Collapse.Panel
        header={<span className="font-semibold ">Selected Text | Lorem Ipsum Loreng-Loreng</span>}
        key="1"
        className="w-full rounded-lg"
        id="custom"
        style={{ backgroundColor: selesai && "#EBEBEB"}}
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
          {editing && !selesai && <Reply nama="1942 - Fafifu" onCancel={() => setEditing(false)}/>}
          {!editing && !selesai && 
          <div className="flex justify-end gap-2">
            <Button onClick={() => setEditing(true)}>Tambah Komentar</Button>
            <Button type="primary">Tandai Sudah Selesai</Button>
          </div>
          }
        </Space>
        {selesai && <p className="font-semibold text-center italic">Komentar ditandai Selesai</p>}
      </Collapse.Panel>
    </Collapse>
  );
}

CommentSectionReply.defaultProps = {
  selesai: false,
  comments: []
}

CommentSectionReply.propTypes = {
  selesai: PropTypes.bool.isRequired,
  comments: PropTypes.array
}