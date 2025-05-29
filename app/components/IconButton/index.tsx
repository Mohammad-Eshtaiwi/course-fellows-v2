import React from 'react';
import { IconType } from 'react-icons';
import styles from './styles.module.scss';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  isLoading?: boolean;
  circle?: boolean;
}

export function IconButton({
  icon: Icon,
  size = 'md',
  variant = 'primary',
  isLoading = false,
  className,
  disabled,
  circle = false,
  ...props
}: IconButtonProps) {
  const buttonClasses = [
    styles.iconButton,
    styles[`iconButton--${size}`],
    styles[`iconButton--${variant}`],
    circle ? styles['iconButton--circle'] : '',
    isLoading ? styles['iconButton--loading'] : '',
    disabled ? styles['iconButton--disabled'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className={styles.iconButton__spinner} />
      ) : (
        <Icon className={styles.iconButton__icon} />
      )}
    </button>
  );
}

export default IconButton;
