import { useState } from "react";
import TableCom from "../../components/tableCom";

export default function CustomerPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const actions = {
    view: true,
    show: true,
    add: true,
    delete: true,
    edit: true,
  };

  const column = [
    {
      field: "no",
      headerName: "No",
      minWidth: 75,
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "job_name",
      headerName: "Job Name",
      minWidth: 250,
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "company",
      headerName: "Company",
      minWidth: 250,
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "salary",
      headerName: "Salary",
      minWidth: 350,
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 350,
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 250,
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "job_tag",
      headerName: "Job Tag",
      minWidth: 150,
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "publishDate",
      headerName: "Publish Date",
      minWidth: 300,
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <div>
      <TableCom
        title="Master Customer"
        actions={actions}
        rows={[]}
        columns={column}
        pageSize={10}
        // handleAdd={(row) => {
        //   helperHandleClick("add", row);
        // }}
        // handleEdit={(row) => {
        //   helperHandleClick("edit", row);
        // }}
        // handleDelete={(row) => {
        //   setDeleteId(row.id);
        //   setShowAlertDelete(true);
        // }}
        // handleView={(row) => {
        //   helperHandleClick("view", row);
        // }}
        // handleDownload={handleDownload}
        loading={loading}
      />
    </div>
  );
}
