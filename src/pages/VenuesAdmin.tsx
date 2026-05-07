import React, { useState } from "react";
import { Alert, Chip, Snackbar } from "@mui/material";
import CrudTable, { ColumnDef } from "./CrudTable";
import CrudModal, { FieldDef } from "./CrudModal";
import { useApi } from "../api/useApi";
import DeleteDialog from "./DeleteDialog";

export default function VenuesAdmin() {
  const {
    data: venues,
    loading,
    create,
    update,
    remove,
  } = useApi<any>("venues");
  const { data: companies } = useApi<any>("companies");

  const fields: FieldDef[] = [
    {
      key: "company_id",
      label: "Company",
      required: true,
      type: "select",
      options: companies.map((c: any) => ({
        value: String(c.company_id),
        label: c.name,
      })),
    },
    { key: "name", label: "Venue Name", required: true },
    { key: "address", label: "Address" },
    { key: "capacity", label: "Capacity", required: true, type: "number" },
    { key: "description", label: "Description", type: "textarea" },
  ];

  const columns: ColumnDef[] = [
    { key: "venue_id", label: "ID" },
    { key: "name", label: "Name" },
    {
      key: "company",
      label: "Company",
      render: (row) => row.company?.name ?? "—",
    },
    { key: "address", label: "Address" },
    {
      key: "capacity",
      label: "Capacity",
      render: (row) => (
        <Chip
          label={row.capacity}
          size="small"
          sx={{ backgroundColor: "#2A6B6B", color: "white", fontWeight: 600 }}
        />
      ),
    },
  ];

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
    setSelected({ ...row, company_id: String(row.company_id) });
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
      else await update(selected.venue_id, form);
      setModalOpen(false);
      showToast(mode === "create" ? "Venue created!" : "Venue updated!");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await remove(selected.venue_id);
      setDeleteOpen(false);
      showToast("Venue deleted.");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  if (loading) return null;

  return (
    <>
      <CrudTable
        title="Venues"
        rows={venues}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idKey="venue_id"
      />
      <CrudModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        title="Venue"
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
