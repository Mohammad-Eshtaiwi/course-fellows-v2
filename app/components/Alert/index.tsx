import { Transition } from "@headlessui/react";
import React from "react";
import { IoClose } from "react-icons/io5";
import styles from "./alert.module.scss";

export type AlertVariant = "success" | "danger" | "warning" | "info";

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  dismissible?: boolean;
  className?: string;
  noIcon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  isVisible,
  onClose,
  dismissible = false,
  className = "",
}) => {
  return (
    <Transition
      show={isVisible}
      enter={styles.enter}
      enterFrom={styles.enterFrom}
      enterTo={styles.enterTo}
      leave={styles.leave}
      leaveFrom={styles.leaveFrom}
      leaveTo={styles.leaveTo}
    >
      <div
        className={`${styles.alert} ${styles[variant]} ${className}`}
        role="alert"
      >
        <div className={styles.content}>
          <div className={styles.textContent}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.message}>{message}</div>
          </div>
        </div>
        {dismissible && onClose && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close alert"
          >
            <IoClose />
          </button>
        )}
      </div>
    </Transition>
  );
};

export default Alert;
