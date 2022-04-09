import PropTypes from "prop-types";
import { Avatar, Button, Input, Form } from "antd";

export default function Reply({ nama, onSubmit, onCancel }) {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar alt="My Avatar" />
          <p className="font-semibold">{nama}</p>
        </div>
      </div>
      <div className="pt-4">
        <Form>
          <Form.Item
            nama="comment"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Form.Item
              noStyle
            >
              <Button
                htmlType="submit"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate
            >
              {({ getFieldValue }) => {
                const comment = getFieldValue("comment")
                return (
                  <Button
                    htmlType="submit"
                    type="primary"
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

Reply.propTypes = {
  nama: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

Reply.defaultProps = {
  onSubmit: () => null,
  onCancel: () => null
}