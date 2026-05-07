import React from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, Box, Typography, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const colors = {
    ink: "#1C1915",
    accent: "#C9622F",
    teal: "#2A6B6B",
};

export interface FieldDef {
    key: string;
    label: string;
    type?: "text" | "number" | "email" | "select" | "textarea" | "date";
    options?: { value: string; label: string }[];
    required?: boolean;
}

interface CrudModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    title: string;
    fields: FieldDef[];
    initialValues?: any;
    mode: "create" | "edit";
}

export default function CrudModal({
    open, onClose, onSubmit, title, fields, initialValues = {}, mode
}: CrudModalProps) {
    const [form, setForm] = React.useState<any>({});

    React.useEffect(() => {
        if (open) setForm(initialValues || {});
    }, [open, initialValues]);

    const handleChange = (key: string, value: any) => {
        setForm((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        onSubmit(form);
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
            },
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: colors.ink }}
            >
              {mode === "create" ? `Add ${title}` : `Edit ${title}`}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {fields.map((field) => {
              if (field.type === "select") {
                return (
                  <TextField
                    key={field.key}
                    select
                    label={field.label}
                    value={form[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    size="small"
                    fullWidth
                  >
                    {field.options?.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }
              if (field.type === "textarea") {
                return (
                  <TextField
                    key={field.key}
                    label={field.label}
                    value={form[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    multiline
                    rows={3}
                    size="small"
                    fullWidth
                  />
                );
              }
              return (
                <TextField
                  key={field.key}
                  label={field.label}
                  type={field.type || "text"}
                  value={form[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={field.required}
                  size="small"
                  fullWidth
                  slotProps={{
                    inputLabel:
                      field.type === "date" ? { shrink: true } : undefined,
                  }}
                />
              );
            })}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              borderColor: "rgba(0,0,0,0.2)",
              color: colors.ink,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: colors.accent,
              "&:hover": { backgroundColor: "#b55325" },
            }}
          >
            {mode === "create" ? "Create" : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    );
}
