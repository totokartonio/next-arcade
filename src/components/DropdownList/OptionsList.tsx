import styles from "./DropdownList.module.css";
import { transformLabel } from "@/utils";
import MagicButton from "../ui/MagicButton";

type Option = {
  label: string;
  href: string;
};

type Props = {
  title?: string;
  optionsArray: Option[];
};

function OptionsList({ title, optionsArray }: Props) {
  return (
    <div className={styles.dropdown}>
      <span className={styles.text}>{title}</span>
      <ul className={styles.list}>
        {optionsArray.map((option, index) => (
          <li key={index}>
            <MagicButton as="link" variant="primary" href={option.href}>
              {transformLabel(option.label)}
            </MagicButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OptionsList;
