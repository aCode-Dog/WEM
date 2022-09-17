import React, { useCallback, useMemo, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
// // import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { request } from "../utils/request";

const Table = () => {
  const containerStyle = useMemo(
    () => ({ width: "1400px", height: "600px", margin: "0 auto" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", filter: true },
    { field: "country", filter: "agSetColumnFilter" },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
    };
  }, []);
  const onGridReady = useCallback((params) => {
    request(
      "http://localhost:3002/api/getTableList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
      "Array"
    ).then((data) => {
      if (data.seccess) {
        params.api.setRowData(data.data);
      }
      params.api.hideOverlay();
    });
  }, []);
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default Table;
