import { Empty, Input, Skeleton, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getDaftarIsi,
  getError,
  getLoading,
} from "../../../../store/ducks/EWP/Mapa/Dokumen/selectors";

function DaftarIsiDokumenMapa({ dataDaftarIsi, loading, error, onClickMenu }) {
  const [dataTree, setdataTree] = useState([]);

  useEffect(() => remapTreeData(dataDaftarIsi), [dataDaftarIsi]);

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children !== undefined) {
        console.log(node.children.id);
        console.log(node.children.some((item) => item.key === key));
        if (node.children.some((item) => item.key === key)) {
          if (node.key == 5) {
            parentKey = node.key;
          } else {
            parentKey = node.id;
          }
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const remapTreeData = (values) => {
    let dataTemp = [...values];
    const index = dataTemp.findIndex((e) => e.children);
    const child = [];
    if (index > -1) {
      dataTemp[index].children.map((item, i) => {
        child.push({
          key: item.ref_auditee_branch_kode,
          id: item.id,
          title: item.ref_auditee_branch_name,
          selectable: false,
          children: [],
        });
        if (item.mapa_uker_aktivitas) {
          item.mapa_uker_aktivitas.map((obj, j) => {
            child[i].children.push({
              key: item.ref_auditee_branch_kode + "sub" + j,
              id: obj.mtd_aktivitas_kode,
              title: obj.mtd_aktivitas_name,
            });
          });
        }
      });
      dataTemp[index] = {
        ...dataTemp[index],
        selectable: false,
        children: child,
      };
    }

    setdataTree(dataTemp);
  };

  return (
    <div
      className="bg-white rounded border border-primary-blue p-4 space-y-2 overflow-auto"
      style={{ height: 800 }}
    >
      <Skeleton loading={loading} active paragraph />
      {error && <Empty />}
      {!loading && !error && (
        <>
          <p className="text-primary-blue font-mulish text-xl font-bold">Daftar Isi</p>
          <Input placeholder="Search...." />
          <Tree
            virtual
            defaultExpandAll={true}
            treeData={dataTree}
            onSelect={(selectedKeys, e) => {
              const parentKey = getParentKey(selectedKeys[0], dataTree);
              let params;
              console.log(parentKey);
              if (parentKey) {
                if (parentKey == 5) {
                  params = { bab: 5, uker_id: e.selectedNodes[0].id };
                } else {
                  params = { bab: 5, uker_id: parentKey, aktivitas_kode: e.selectedNodes[0].id };
                }
              } else {
                params = { bab: selectedKeys[0] };
              }
              console.log(params);
              onClickMenu(e.selectedNodes[0], params);
            }}
          />
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataDaftarIsi: getDaftarIsi(state),
    loading: getLoading(state),
    error: getError(state),
  };
};

export default connect(mapStateToProps, null)(DaftarIsiDokumenMapa);
