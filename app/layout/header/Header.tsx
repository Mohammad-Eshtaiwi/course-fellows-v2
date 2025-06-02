import SignOutButton from "@/app/components/SignOutButton";
import Container from "@/app/components/Container";
import Image from "next/image";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <h1 className="heading-xl">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          Course Fellows
        </h1>
        <SignOutButton />
      </Container>
    </header>
  );
}
