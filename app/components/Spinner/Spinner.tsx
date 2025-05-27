import React from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'primary-light' | 'white' | 'dark-900' | 'dark-800' | 'dark-700' | 'dark-600' | 'grey';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} text-${color} ${className}`}
      role="status"
    >
      <span className={styles.srOnly}>
        Loading...
      </span>
    </div>
  );
};

export default Spinner; 