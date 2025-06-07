import { forwardRef } from "react";
import { Field, Input as HeadlessInput, Label } from "@headlessui/react";
import styles from "./input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
  id: string;
}

function InputComponent(
  { label, error, description, className, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <Field className={styles.container}>
      {label && (
        <Label className={styles.label} htmlFor={props.id}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </Label>
      )}
      <HeadlessInput
        ref={ref}
        className={`${styles.input} ${error ? styles.error : ""} ${
          className || ""
        }`}
        {...props}
      />
      {description && !error && (
        <p className={styles.description}>{description}</p>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </Field>
  );
}

const Input = forwardRef(InputComponent);

Input.displayName = "Input";

export default Input;
