import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Table = () => {
  //   const [rowData, setRowData] = useState([
  //     { make: "Toyota", model: "Celica", price: 35000 },
  //     { make: "Ford", model: "Mondeo", price: 32000 },
  //     { make: "Porsche", model: "Boxter", price: 72000 },
  //   ]);
  const data = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];
  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: 600, margin: "0 auto" }}
    >
      <AgGridReact rowSelection="multiple" rowData={data}>
        <AgGridColumn
          field="make"
          sortable={true}
          filter={true}
          checkboxSelection={true}
        ></AgGridColumn>
        <AgGridColumn field="model" filter={true}></AgGridColumn>
        <AgGridColumn field="price" sortable={true}></AgGridColumn>
      </AgGridReact>
    </div>
  );
};
export default Table;
