import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import CrudTable, { ColumnDef } from "./CrudTable";
import CrudModal, { FieldDef } from "./CrudModal";

import { useApi } from "../api/useApi";
import DeleteDialog from "./DeleteDialog";

const fields: FieldDef[] = [
  { key: "name", label: "Company Name", required: true },
  { key: "email", label: "Email", required: true, type: "email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
];

const columns: ColumnDef[] = [
  { key: "company_id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
];

export default function CompaniesAdmin() {
  const { data, loading, create, update, remove } = useApi<any>("companies");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [toast, setToast] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({ open: false, msg: "", severity: "success" });

  const showToast = (msg: string, severity: "success" | "error" = "success") =>
    setToast({ open: true, msg, severity });

  const handleAdd = () => {
    setSelected(null);
    setMode("create");
    setModalOpen(true);
  };
  const handleEdit = (row: any) => {
    setSelected(row);
    setMode("edit");
    setModalOpen(true);
  };
  const handleDelete = (row: any) => {
    setSelected(row);
    setDeleteOpen(true);
  };

  const handleSubmit = async (form: any) => {
    try {
      if (mode === "create") await create(form);
      else await update(selected.company_id, form);
      setModalOpen(false);
      showToast(mode === "create" ? "Company created!" : "Company updated!");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await remove(selected.company_id);
      setDeleteOpen(false);
      showToast("Company deleted.");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  if (loading) return null;

  return (
    <>
      <CrudTable
        title="Companies"
        rows={data}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idKey="company_id"
      />
      <CrudModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        title="Company"
        fields={fields}
        initialValues={selected}
        mode={mode}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selected?.name}
      />
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      >
        <Alert severity={toast.severity} sx={{ borderRadius: "10px" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
