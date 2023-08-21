import styles from "./styles.module.css";

interface Props {
  msg: string;
  close: () => void;
}

export default function Error ({ msg, close }: Props) {
  return (
    <div className={styles.container}>
      <div>
        <p>{msg}</p>
        <button onClick={close}>FECHAR</button>
      </div>
    </div>
  )
};
