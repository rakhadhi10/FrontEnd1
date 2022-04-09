import { Button, Typography } from "antd";

export default function AddendumWarning({ disabled = true }) {
  return (
    <div className="border border-dashed border-primary-red rounded-xl px-4 py-6 mt-16 mb-8 flex items-center gap-4">
      <Typography.Text type="danger">
        Adendum MAPA di inisiasi oleh KTA. Adendum MAPA harus dilakukan secara hati-hati karena
        dapat merubah semua inputan yang ada didalam Modul MAPA pada project ini.
      </Typography.Text>
      <Button type="danger" disabled={disabled}>
        Adendum MAPA
      </Button>
    </div>
  );
}
