import React, { useState } from "react";
import { Alert, Chip, Snackbar } from "@mui/material";
import CrudTable, { ColumnDef } from "./CrudTable";
import CrudModal, { FieldDef } from "./CrudModal";
import { useApi } from "../api/useApi"
import DeleteDialog from "./DeleteDialog";

const statusColors: Record<string, { bg: string; color: string }> = {
    CONFIRMED: { bg: "#e8f5e9", color: "#2e7d32" },
    PENDING:   { bg: "#fff8e1", color: "#f57f17" },
    CANCELLED: { bg: "#ffebee", color: "#c62828" },
};

export default function ReservationsAdmin() {
    const { data: reservations, loading, create, update, remove } = useApi<any>("reservations");
    const { data: users }  = useApi<any>("users");
    const { data: events } = useApi<any>("events");

    const fields: FieldDef[] = [
        {
            key: "user_id", label: "User", required: true, type: "select",
            options: users.map((u: any) => ({ value: String(u.user_id), label: `${u.first_name} ${u.last_name}` })),
        },
        {
            key: "event_id", label: "Event", required: true, type: "select",
            options: events.map((e: any) => ({ value: String(e.event_id), label: e.title })),
        },
        { key: "seats", label: "Seats", type: "number" },
        {
            key: "status", label: "Status", type: "select",
            options: [
                { value: "CONFIRMED", label: "Confirmed" },
                { value: "PENDING",   label: "Pending" },
                { value: "CANCELLED", label: "Cancelled" },
            ],
        },
    ];

    const columns: ColumnDef[] = [
        { key: "reservation_id", label: "ID" },
        { key: "user",  label: "User",  render: (row) => row.user ? `${row.user.first_name} ${row.user.last_name}` : "—" },
        { key: "event", label: "Event", render: (row) => row.event?.title ?? "—" },
        { key: "seats", label: "Seats" },
        {
            key: "status", label: "Status",
            render: (row) => {
                const s = statusColors[row.status] ?? { bg: "#eee", color: "#333" };
                return (
                    <Chip label={row.status} size="small"
                        sx={{ backgroundColor: s.bg, color: s.color, fontWeight: 600, fontSize: 11 }} />
                );
            }
        },
        { key: "reserved_at", label: "Reserved At", render: (row) => new Date(row.reserved_at).toLocaleDateString() },
    ];

    const [modalOpen, setModalOpen]   = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selected, setSelected]     = useState<any>(null);
    const [mode, setMode]             = useState<"create" | "edit">("create");
    const [toast, setToast]           = useState<{ open: boolean; msg: string; severity: "success" | "error" }>
                                        ({ open: false, msg: "", severity: "success" });

    const showToast = (msg: string, severity: "success" | "error" = "success") =>
        setToast({ open: true, msg, severity });

    const handleAdd    = () => { setSelected(null); setMode("create"); setModalOpen(true); };
    const handleEdit   = (row: any) => {
        setSelected({ ...row, user_id: String(row.user_id), event_id: String(row.event_id) });
        setMode("edit");
        setModalOpen(true);
    };
    const handleDelete = (row: any) => { setSelected(row); setDeleteOpen(true); };

    const handleSubmit = async (form: any) => {
        try {
            if (mode === "create") await create(form);
            else await update(selected.reservation_id, form);
            setModalOpen(false);
            showToast(mode === "create" ? "Reservation created!" : "Reservation updated!");
        } catch (e: any) { showToast(e.message, "error"); }
    };

    const handleConfirmDelete = async () => {
        try {
            await remove(selected.reservation_id);
            setDeleteOpen(false);
            showToast("Reservation deleted.");
        } catch (e: any) { showToast(e.message, "error"); }
    };

    if (loading) return null;

    return (
        <>
            <CrudTable title="Reservations" rows={reservations} columns={columns} onAdd={handleAdd}
                onEdit={handleEdit} onDelete={handleDelete} idKey="reservation_id" />
            <CrudModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}
                title="Reservation" fields={fields} initialValues={selected} mode={mode} />
            <DeleteDialog open={deleteOpen} onClose={() => setDeleteOpen(false)}
                onConfirm={handleConfirmDelete} itemName={`Reservation #${selected?.reservation_id}`} />
            <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))}>
                <Alert severity={toast.severity} sx={{ borderRadius: "10px" }}>{toast.msg}</Alert>
            </Snackbar>
        </>
    );
}
