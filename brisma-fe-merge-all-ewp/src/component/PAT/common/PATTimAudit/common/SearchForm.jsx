import { useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";

export default function SearchForm({
  fetchAllTimAudit,
  updateFilterForm,
  currentPage,
}) {
  const { pat_id } = useParams()

  return (
    <Form
      name="basic"
      onFinish={(val) => fetchAllTimAudit(pat_id, currentPage)}
      onValuesChange={(_, allValues) => updateFilterForm(allValues)}
    >
      <div className="grid grid-cols-3 gap-8">
        <div>
          <Form.Item name="tim_name">
            <Input placeholder="Tim's name" />
          </Form.Item>
          <Form.Item name="nama_ma" style={{ marginBottom: "0" }}>
            <Input placeholder="Name of MA" />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="nama_kta">
            <Input placeholder="Name of KTA" />
          </Form.Item>
          <Form.Item name="nama_ata" style={{ marginBottom: "0" }}>
            <Input placeholder="Name of ATAs" />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="nama_uker">
            <Input placeholder="Name of Unit Kerja" />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            {/* <Form.Item shouldUpdate style={{ marginBottom: "0" }}>
              {({ getFieldsValue }) => {
                const { tim_name, nama_ma, nama_kta, nama_ata, nama_uker } = getFieldsValue();
                const isAnyFilled = tim_name || nama_ma || nama_kta || nama_ata || nama_uker;
                return (
                  <Button type="primary" htmlType="submit" disabled={!isAnyFilled}>
                    Search
                  </Button>
                );
              }}
            </Form.Item> */}
          </div>
        </div>
      </div>
      <div className="flex justify-end"></div>
    </Form>
  );
}
