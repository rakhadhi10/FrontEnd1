import PropTypes from "prop-types";
import { Avatar, Button, Input, Form } from "antd";
import { useParams } from "react-router-dom";

export default function Reply({ parentId, nama, onCancel, reply }) {
  const { pat_id } = useParams()

  return (
    <Form>
      <div className="bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar alt="My Avatar" />
            <p className="font-semibold">{nama}</p>
          </div>
        </div>
        <div className="pt-4">
          <Form.Item name="comment">
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
                    onClick={async () => {
                      const success = await reply(pat_id, parentId, comment)
                      if (success) onCancel()
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

Reply.propTypes = {
  nama: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

Reply.defaultProps = {
  onSubmit: () => null,
  onCancel: () => null
}