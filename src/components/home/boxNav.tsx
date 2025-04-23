import styles from "./Nav.module.css";

type Props = {
  text: string;
  iconSrc: string;
};

export default function BoxNav({ text, iconSrc }: Props) {
  return (
    <div className={styles.box}>
      <img src={iconSrc} alt={text} className={styles.icon} />
      <span className={styles.tooltip}>{text}</span>
    </div>
  );
}
