import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import CrudTable, { ColumnDef } from "./CrudTable";
import CrudModal, { FieldDef } from "./CrudModal";
import { useApi } from "../api/useApi";
import DeleteDialog from "./DeleteDialog";

const fields: FieldDef[] = [
  { key: "first_name", label: "First Name", required: true },
  { key: "last_name", label: "Last Name", required: true },
  { key: "email", label: "Email", required: true, type: "email" },
  { key: "phone", label: "Phone" },
];

const columns: ColumnDef[] = [
  { key: "user_id", label: "ID" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  {
    key: "created_at",
    label: "Joined",
    render: (row) => new Date(row.created_at).toLocaleDateString(),
  },
];

export default function UsersAdmin() {
  const { data, loading, create, update, remove } = useApi<any>("users");
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
      else await update(selected.user_id, form);
      setModalOpen(false);
      showToast(mode === "create" ? "User created!" : "User updated!");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await remove(selected.user_id);
      setDeleteOpen(false);
      showToast("User deleted.");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  if (loading) return null;

  return (
    <>
      <CrudTable
        title="Users"
        rows={data}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idKey="user_id"
      />
      <CrudModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        title="User"
        fields={fields}
        initialValues={selected}
        mode={mode}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={`${selected?.first_name} ${selected?.last_name}`}
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
