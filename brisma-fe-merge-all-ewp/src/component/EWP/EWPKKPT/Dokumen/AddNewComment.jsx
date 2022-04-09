import PropTypes from "prop-types";
import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Form } from "antd";

export default function AddNewComment({ nama, onSubmit, onClose }){
  return (
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
        <Form>
          <Form.Item
            nama="comment"
          >
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
                    onClick={() => onSubmit(comment)}
                    disabled={!comment}
                  >
                    Kirim Komentar
                  </Button>
                )
              }}
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

AddNewComment.propTypes = {
  nama: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

AddNewComment.defaultProps = {
  onSubmit: (a) => console.log(a),
  onClose: () => null
}