import React from "react";
import {
    Box, Typography, Button, IconButton, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    Chip, Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const colors = {
    ink: "#1C1915",
    accent: "#C9622F",
    teal: "#2A6B6B",
    cream: "#FAF8F4",
};

export interface ColumnDef {
    key: string;
    label: string;
    render?: (row: any) => React.ReactNode;
}

interface CrudTableProps {
    title: string;
    rows: any[];
    columns: ColumnDef[];
    onAdd: () => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    idKey: string;
}

export default function CrudTable({ title, rows, columns, onAdd, onEdit, onDelete, idKey }: CrudTableProps) {
    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: colors.ink }}>
                    {title}
                    <Chip
                        label={rows.length}
                        size="small"
                        sx={{ ml: 1.5, backgroundColor: colors.teal, color: "white", fontWeight: 600, fontSize: 12 }}
                    />
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAdd}
                    sx={{
                        backgroundColor: colors.accent,
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#b55325" },
                    }}
                >
                    Add {title.replace(/s$/, "")}
                </Button>
            </Box>

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: colors.cream }}>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    sx={{ fontWeight: 600, color: colors.ink, fontSize: 13, py: 1.5 }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                            <TableCell align="right" sx={{ fontWeight: 600, color: colors.ink, fontSize: 13, py: 1.5 }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 4, color: "#999" }}>
                                    No records found
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <TableRow
                                    key={row[idKey]}
                                    sx={{
                                        "&:hover": { backgroundColor: "rgba(0,0,0,0.02)" },
                                        "&:last-child td": { border: 0 },
                                    }}
                                >
                                    {columns.map((col) => (
                                        <TableCell key={col.key} sx={{ fontSize: 13, py: 1.25 }}>
                                            {col.render ? col.render(row) : row[col.key] ?? "—"}
                                        </TableCell>
                                    ))}
                                    <TableCell align="right" sx={{ py: 1.25 }}>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                size="small"
                                                onClick={() => onEdit(row)}
                                                sx={{ color: colors.teal, mr: 0.5 }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                size="small"
                                                onClick={() => onDelete(row)}
                                                sx={{ color: "#c62828" }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
