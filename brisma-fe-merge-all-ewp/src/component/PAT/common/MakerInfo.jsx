import PropTypes from "prop-types";
import { Collapse, Form, Space } from "antd";

const { Panel } = Collapse

export default function MakerInfo({ maker, date_created, last_updated }) {
  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        bordered
        ghost
      >
        <Panel
          header={<span className="font-semibold text-primary-blue">Menu Information</span>}
          key="1"
        >
          <Space
            direction="vertical"
            size="large"
            className="w-full"
          >
            <Form
              labelAlign="left"
              labelCol={{ span: 2 }}
            >
              <Form.Item
                label={<p className="text-primary-blue">Maker</p>}
                style={{ margin: 0 }}
                className="text-primary-blue"
              >
                <p>{maker}</p>
              </Form.Item>
              {date_created &&
                <Form.Item
                  label={<p className="text-primary-blue">Date Created</p>}
                  style={{ margin: 0 }}
                  className="text-primary-blue"
                >
                  <p>{date_created}</p>
                </Form.Item>
              }
              {last_updated &&
                <Form.Item
                  label={<p className="text-primary-blue">Last Updated</p>}
                  style={{ margin: 0 }}
                  className="text-primary-blue"
                >
                  <p>{last_updated}</p>
                </Form.Item>
              }
            </Form>
          </Space>
        </Panel>
      </Collapse>
    </div>
  );
}

MakerInfo.propTypes = {
  maker: PropTypes.string,
  date_created: PropTypes.string,
  last_updated: PropTypes.string
}