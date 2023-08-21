import Link from "next/link";

import styles from "./styles.module.css";

const pages = ["clubes", "campeonatos", "registrar", "notificações"];

export default function Header() {
  return (
    <header className={styles.header}>
      <div>LOGO</div>
      <nav>
        <ul>
          {pages.map((page) => {
            return (
              <li key={page}>
                <Link href={`/${page}`}>{page}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
