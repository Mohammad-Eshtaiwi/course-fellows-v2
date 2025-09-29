import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.links}>
          <Link href="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link href="/">© 2025 Course Fellows</Link>
        </div>
      </div>
    </footer>
  );
}
