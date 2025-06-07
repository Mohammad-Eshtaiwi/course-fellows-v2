import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { ReactNode } from "react";
import styles from "./dialog.module.scss";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "xxl";
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: DialogProps) {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose} className={styles.dialog}>
      <DialogBackdrop className={styles.dialogOverlay} aria-hidden="true" />

      <div className={styles.dialogContainer}>
        <DialogPanel className={`${styles.dialogPanel} ${styles[maxWidth]}`}>
          <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>

          {children}
        </DialogPanel>
      </div>
      <DialogBackdrop />
    </HeadlessDialog>
  );
}
