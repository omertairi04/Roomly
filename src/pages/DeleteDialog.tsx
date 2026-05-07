import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  itemName,
}: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
          },
        },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}
      >
        <WarningAmberIcon sx={{ color: "#c62828" }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Delete {itemName}?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          This action cannot be undone. The record will be permanently deleted.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            borderColor: "rgba(0,0,0,0.2)",
            color: "#1C1915",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#c62828",
            "&:hover": { backgroundColor: "#a52020" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
