import React from 'react';
import styles from './styles.module.scss';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

function Progress({
  value,
  max = 100,
  size = 'medium',
  color = 'primary',
  className = '',
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`${styles.progressWrapper} ${styles[size]} ${styles[color]} ${className}`}>
      <div 
        className={styles.progressBar}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Progress; 