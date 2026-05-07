import React, { useState } from "react";
import { Alert, Chip, Snackbar } from "@mui/material";
import CrudTable, { ColumnDef } from "./CrudTable";
import CrudModal, { FieldDef } from "./CrudModal";
import { useApi } from "../api/useApi";
import DeleteDialog from "./DeleteDialog";

const statusColors: Record<string, { bg: string; color: string }> = {
    ACTIVE:    { bg: "#e8f5e9", color: "#2e7d32" },
    DRAFT:     { bg: "#f5f5f5", color: "#757575" },
    COMPLETED: { bg: "#e3f2fd", color: "#1565c0" },
    CANCELLED: { bg: "#ffebee", color: "#c62828" },
};

export default function EventsAdmin() {
    const { data: events, loading, create, update, remove } = useApi<any>("events");
    const { data: venues } = useApi<any>("venues");

    const fields: FieldDef[] = [
        {
            key: "venue_id", label: "Venue", required: true, type: "select",
            options: venues.map((v: any) => ({ value: String(v.venue_id), label: v.name })),
        },
        { key: "title",          label: "Title",        required: true },
        { key: "description",    label: "Description",  type: "textarea" },
        { key: "event_date",     label: "Start Date",   required: true, type: "date" },
        { key: "event_end_date", label: "End Date",     type: "date" },
        { key: "max_capacity",   label: "Max Capacity", required: true, type: "number" },
        { key: "price",          label: "Price (€)",    type: "number" },
        {
            key: "status", label: "Status", type: "select",
            options: [
                { value: "ACTIVE",    label: "Active" },
                { value: "DRAFT",     label: "Draft" },
                { value: "COMPLETED", label: "Completed" },
                { value: "CANCELLED", label: "Cancelled" },
            ],
        },
    ];

    const columns: ColumnDef[] = [
        { key: "event_id", label: "ID" },
        { key: "title",    label: "Title" },
        { key: "venue",    label: "Venue",    render: (row) => row.venue?.name ?? "—" },
        { key: "event_date", label: "Date",   render: (row) => new Date(row.event_date).toLocaleDateString() },
        { key: "price",    label: "Price",    render: (row) => Number(row.price) === 0 ? "Free" : `${row.price}€` },
        { key: "max_capacity", label: "Capacity" },
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
        setSelected({
            ...row,
            venue_id: String(row.venue_id),
            event_date: row.event_date?.slice(0, 10),
            event_end_date: row.event_end_date?.slice(0, 10),
        });
        setMode("edit");
        setModalOpen(true);
    };
    const handleDelete = (row: any) => { setSelected(row); setDeleteOpen(true); };

    const handleSubmit = async (form: any) => {
        try {
            if (mode === "create") await create(form);
            else await update(selected.event_id, form);
            setModalOpen(false);
            showToast(mode === "create" ? "Event created!" : "Event updated!");
        } catch (e: any) { showToast(e.message, "error"); }
    };

    const handleConfirmDelete = async () => {
        try {
            await remove(selected.event_id);
            setDeleteOpen(false);
            showToast("Event deleted.");
        } catch (e: any) { showToast(e.message, "error"); }
    };

    if (loading) return null;

    return (
        <>
            <CrudTable title="Events" rows={events} columns={columns} onAdd={handleAdd}
                onEdit={handleEdit} onDelete={handleDelete} idKey="event_id" />
            <CrudModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}
                title="Event" fields={fields} initialValues={selected} mode={mode} />
            <DeleteDialog open={deleteOpen} onClose={() => setDeleteOpen(false)}
                onConfirm={handleConfirmDelete} itemName={selected?.title} />
            <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))}>
                <Alert severity={toast.severity} sx={{ borderRadius: "10px" }}>{toast.msg}</Alert>
            </Snackbar>
        </>
    );
}
