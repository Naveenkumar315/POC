import React from "react";
import { useState } from "react";
import Papa from "papaparse";
import MUIDataTable from "mui-datatables";
import "./App.css";

function App() {
  const [data, setData] = useState({ tableData: [] });

  const handleSelectFile = async (e) => {
    debugger;
    const parsedData = await new Promise((resolve, reject) => {
      Papa.parse(e.target.files[0], {
        skipEmptyLines: true,
        header: true, // Assuming CSV file has a header row
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
    setData({ tableData: parsedData });
    e.target.value = "";
  };

  return (
    <>
      <div
        style={{
          width: "20%",
          height: "10vh",
          backgroundColor: "rosybrown",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
        }}
      >
        <input onChange={handleSelectFile} type="file" />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Table data={data?.tableData} />
      </div>
    </>
  );
}

const Table = (props) => {
  const { data } = props;
  const columns = data && data.length > 0 ? Object.keys(data?.[0]) : [];
  const tableData = data;
  const options = {
    filterType: "checkbox",
  };

  return (
    <>
      <div
        style={{
          width: "50%",
          height: "50vh",
          overflow: "auto",

          // backgroundColor: "#1f1f1f",
        }}
      >
        <MUIDataTable
          title={"Book List"}
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default App;
