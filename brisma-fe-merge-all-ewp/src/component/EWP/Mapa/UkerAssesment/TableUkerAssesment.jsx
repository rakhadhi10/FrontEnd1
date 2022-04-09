import { Button, message, Table, Form, Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { postUkerAssesment } from "../../../../store/ducks/EWP/Mapa/UkerAssesment/actions";
import {
  getBody,
  getError,
  getLoading,
} from "../../../../store/ducks/EWP/Mapa/UkerAssesment/selectors";
import { fetchRefUko } from "../../../../store/ducks/reference/actions";
import {
  getRefUko,
  getRefUkoLoading,
} from "../../../../store/ducks/reference/selectors";
import DebounceOrgeh from "../../../AutoComplete/DebounceOrgeh";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../utils/notifications";

const showSuccessNotif = createSuccessNotification(
  "Uker Assesment",
  "Berhasil menyimpan Uker Assesment"
);
const showErrorNotif = createErrorNotification(
  "Uker Assesment",
  "Gagal menyimpan Uker Assesment"
);

const { Option } = Select;

function TableUkerAssesment({
  dataBody = [],
  loading,
  error,
  postUkerAssesment,
  dataUko,
  fetchRefUko,
  loadingUko,
}) {
  const [editedOrgeh, seteditedOrgeh] = useState([]);
  const [editedTipeUker, seteditedTipeUker] = useState([]);
  const [editedSelection, seteditedSelection] = useState([]);
  const [selectedData, setselectedData] = useState([]);
  const { project_id } = useParams();

  useEffect(() => {
    const dataTemp = [];
    dataBody.map((item) => item.is_selected && dataTemp.push(item));
    setselectedData(dataTemp);
  }, [dataBody]);

  useEffect(() => fetchRefUko(), [fetchRefUko]);

  const onSubmit = async () => {
    const newData = [];
    selectedData.map((item) => {
      const indexOrgeh = editedOrgeh.findIndex((e) => e.key === item.key);
      const indexTipeUker = editedTipeUker.findIndex((e) => e.key === item.key);
      const indexSelection = editedSelection.findIndex(
        (e) => e.key === item.key
      );

      newData.push({
        key: item.key,
        orgeh_kode:
          indexOrgeh > -1 ? editedOrgeh[indexOrgeh].child : item.orgeh_kode,
        orgeh_name:
          indexOrgeh > -1 ? editedOrgeh[indexOrgeh].my_name : item.orgeh_name,
        tipe_uker:
          indexTipeUker > -1
            ? editedTipeUker[indexTipeUker].value
            : item.tipe_uker,
        description:
          indexSelection > -1
            ? editedSelection[indexSelection].value
            : item.description,
      });
    });

    console.log(newData);
    const failed = await postUkerAssesment(project_id, newData);
    if (!failed) {
      showSuccessNotif();
    } else {
      showErrorNotif();
    }
  };
  console.log(dataUko);

  const onChangeOrgeh = (value, key) => {
    console.log(key);
    const index = editedOrgeh.findIndex((item) => item.key === key);
    const newData = [...editedOrgeh];
    if (index > -1) {
      newData[index] = {
        key: key,
        ...value,
      };
    } else {
      newData.push({
        key: key,
        ...value,
      });
    }
    console.log(newData);
    seteditedOrgeh(newData);
  };

  const onChangeTipeUker = (value) => {
    console.log(value);
    const index = editedTipeUker.findIndex((item) => item.key === value.key);
    const newData = [...editedTipeUker];
    if (index > -1) {
      newData[index] = {
        key: value.key,
        value: value.value,
      };
    } else {
      newData.push({
        key: value.key,
        value: value.value,
      });
    }
    console.log(newData);
    seteditedTipeUker(newData);
  };

  const onChangeSelection = (e, key) => {
    console.log(e);
    const index = editedSelection.findIndex((item) => item.key === key);
    const newData = [...editedSelection];
    if (index > -1) {
      newData[index] = {
        key: key,
        value: e.target.value,
      };
    } else {
      newData.push({
        key: key,
        value: e.target.value,
      });
    }
    console.log(newData);
    seteditedSelection(newData);
  };

  const columns = [
    {
      title: "Uker Information",
      children: [
        {
          title: "Kode Uker",
          dataIndex: "branch_kode",
          key: "branch_kode",
        },
        {
          title: "Nama Uker",
          dataIndex: "branch_name",
          key: "branch_name",
        },
        {
          title: "Tipe Uker",
          dataIndex: "tipe_uker",
          key: "tipe_uker",
          render: (_, record) => (
            <>
              <Select
                defaultValue={record.tipe_uker}
                loading={loadingUko}
                labelInValue
                onChange={onChangeTipeUker}
              >
                {dataUko &&
                  dataUko.map((item) => (
                    <Option key={record.key} value={item.kode}>
                      {item.kode}
                    </Option>
                  ))}
              </Select>
            </>
          ),
        },
        {
          title: "Orgeh",
          dataIndex: "orgeh_name",
          key: "orgeh_name",
          render: (_, record) =>
            dataBody && (
              <Form>
                <Form.Item
                  key={record.key}
                  name="orgeh_name"
                  initialValue={record.orgeh_kode + " - " + record.orgeh_name}
                  style={{ width: 200, textOverflow: "ellipsis" }}
                >
                  <DebounceOrgeh
                    onChange={(value) => onChangeOrgeh(value, record.key)}
                    placeholder="Ketik kode orgeh atau nama orgeh"
                    disabled={false}
                  />
                </Form.Item>
              </Form>
            ),
        },
      ],
    },
    {
      title: "Information of Assesment",
      children: [
        {
          title: "2 years Na",
          dataIndex: "dua_years_na",
          key: "dua_years_na",
        },
        {
          title: "Temuan Fraud",
          dataIndex: "temuan_fraud",
          key: "temuan_fraud",
        },
        {
          title: "Temuan Major",
          dataIndex: "temuan_major",
          key: "temuan_major",
        },
        {
          title: "Temuan Moderate",
          dataIndex: "temuan_moderate",
          key: "temuan_moderate",
        },
      ],
    },
    Table.SELECTION_COLUMN,
    {
      title: "Selection",
      dataIndex: "description",
      key: "selection",
      width: 200,
      render: (_, record) => (
        <Input
          defaultValue={record.description}
          width={150}
          onChange={(e) => onChangeSelection(e, record.key)}
        />
      ),
    },
  ];

  const rowSelection = {
    hideSelectAll: true,
    selectedRowKeys: selectedData.map((item) => item.key),
    onSelect: (record, selected, selectedRows) => {
      console.log(record.key);
      if (selected) {
        const index = selectedData.findIndex((e) => e.key === record.key);
        if (index < 0) {
          setselectedData((prev) => [...prev, record]);
        }
      } else {
        const index = selectedData.findIndex((e) => e.key === record.key);
        if (index > -1) {
          setselectedData(selectedData.filter((e) => e.key !== record.key));
        }
      }
    },
  };

  return (
    <div>
      {error && message.error(error)}
      <Table
        loading={loading || loadingUko}
        columns={columns}
        dataSource={dataBody}
        rowKey="key"
        rowSelection={rowSelection}
        rowClassName={(record, index) =>
          record.adhoc && "text-red-700 bg-red-100"
        }
        bordered
      />
      <div className="py-4 flex justify-end">
        <Button type="primary" onClick={onSubmit} disabled={loading}>
          Simpan
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataBody: getBody(state),
    loading: getLoading(state),
    error: getError(state),
    dataUko: getRefUko(state),
    loadingUko: getRefUkoLoading(state),
  };
};

const mapDispatchToProps = {
  postUkerAssesment: postUkerAssesment,
  fetchRefUko: fetchRefUko,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUkerAssesment);
