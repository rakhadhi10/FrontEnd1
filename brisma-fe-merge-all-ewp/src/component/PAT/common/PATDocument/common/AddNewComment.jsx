import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Form } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserName, getUserPN } from "../../../../../store/ducks/auth/selectors";

function AddNewComment({ nama, onClose, addNewComment }) {
  const { pat_id } = useParams()

  return (
    <Form name="add_new_comment">
      <div className="bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar alt="My Avatar" />
            <p className="font-semibold">{nama}</p>
          </div>
          <CloseOutlined
            className="text-primary-red cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="pt-4">
          <Form.Item name="comment">
            <Input.TextArea rows={4} />
          </Form.Item>
          <div className="flex justify-end">
            <Form.Item
              noStyle
              shouldUpdate
            >
              {({ getFieldValue }) => {
                const comment = getFieldValue("comment")
                return (
                  <Button
                    htmlType="submit"
                    onClick={async () => {
                      const success = await addNewComment(pat_id, comment)
                      if (success) onClose()
                    }}
                    disabled={!comment}
                  >
                    Kirim Komentar
                  </Button>
                )
              }}
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
}

const mapStateToProps = state => ({
  nama: `${getUserPN(state)} - ${getUserName(state)}`
})

export default connect(mapStateToProps)(AddNewComment)