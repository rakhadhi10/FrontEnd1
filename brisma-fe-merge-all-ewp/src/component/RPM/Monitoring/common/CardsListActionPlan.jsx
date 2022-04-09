import { Space } from "antd";

export default function CardsListActionPlan({ plans, card: CardActionPlan, ...props }) {
  return (
    <Space direction="vertical" size="large">
      {
        plans ? plans.map(p => (
          <CardActionPlan key={p.id} {...p} {...props} />
        )) : []
      }
    </Space>
  )
}