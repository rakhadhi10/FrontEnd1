import PropTypes from "prop-types";
import { Collapse, Typography } from "antd";
import IDCurrencyFormat from "../../IDCurrencyFormat";

const { Panel } = Collapse;

export default function RincianBiaya({ title, data }) {
  return (
    <div
      style={{ backgroundColor: "#F8F8F8" }}
      className="h-72 overflow-auto px-4 py-2"
    >
      <Typography.Title level={5}>
        <Typography.Text type="secondary">
          {title}
        </Typography.Text>
      </Typography.Title>
      <Collapse
        expandIconPosition="right"
        ghost
        className="border-none"
      >
        {data.map((item, index) => {
          const { parent, children } = item
          return (
            <Panel
              key={index}
              header={
                <div className="w-full flex flex-wrap justify-between items-center">
                  <p>{parent.label}</p>
                  <IDCurrencyFormat
                    value={parent.amount}
                    prefix="Rp"
                    suffix={null}
                    renderText={value => (
                      <p>{value}</p>
                    )}
                  />
                  
                </div>
              }
            >
              <div className="pl-2">
                {children.map((child, index) =>
                  (
                  <div key={index} className="flex justify-between">
                    <p><Typography.Text type="secondary">{child.label}</Typography.Text></p>
                    <IDCurrencyFormat
                      value={child.amount}
                      prefix="Rp"
                      suffix={null}
                      renderText={value => (
                        <p><Typography.Text type="secondary">{value}</Typography.Text></p>
                      )}
                    />
                  </div>
                  )
                )}
              </div>
            </Panel>
          )
        })}
      </Collapse>
    </div>
  );
}

RincianBiaya.defaultProps = {
  title: "RINCIAN BIAYA",
  data: [
    {
      parent: { label: "-", amount: "-" },
      children: [
        { label: "-" },
        { label: "-" },
      ]
    }
  ]
}

RincianBiaya.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      parent: PropTypes.shape({
        label: PropTypes.string,
        amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      }),
      children: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
      )
    })
  )
}