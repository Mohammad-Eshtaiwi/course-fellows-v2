import { forwardRef } from "react";
import { RadioGroup as HeadlessRadioGroup, Radio, Field, Label, Description } from "@headlessui/react";
import styles from "./radioGroup.module.scss";

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      description,
      error,
      disabled = false,
      name,
      className = "",
    },
    ref
  ) => {
    return (
      <div className={`${styles.container} ${className}`} ref={ref}>
        <HeadlessRadioGroup
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          aria-label={label}
        >
          {label && (
            <Label className={styles.groupLabel}>
              {label}
            </Label>
          )}
          
          {description && !error && (
            <Description className={styles.groupDescription}>
              {description}
            </Description>
          )}

          <div className={styles.optionsContainer}>
            {options.map((option) => (
              <Field key={option.value} className={styles.fieldWrapper}>
                <div className={styles.option}>
                  <Radio
                    value={option.value}
                    className={styles.radioButton}
                  >
                    <span className={styles.radioIndicator} />
                  </Radio>
                  <div className={styles.labelContent}>
                    <Label className={styles.optionLabel}>
                      {option.label}
                    </Label>
                    {option.description && (
                      <Description className={styles.optionDescription}>
                        {option.description}
                      </Description>
                    )}
                  </div>
                </div>
              </Field>
            ))}
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
        </HeadlessRadioGroup>
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup; 