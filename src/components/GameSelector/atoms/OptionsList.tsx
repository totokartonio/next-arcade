import styles from "../GameSelector.module.css";
import { transformLabel } from "@/utils";
import MagicButton from "../../ui/MagicButton";

type Option = {
  label: string;
  href: string;
};

type Props = {
  title?: string;
  optionsArray: Option[];
  isVisible: boolean;
};

function OptionsList({ optionsArray, isVisible }: Props) {
  return (
    <div className={`${styles.options} ${isVisible ? styles.visible : ""}`}>
      <span className={styles.text}>Select Difficulty</span>
      <ul className={styles.list}>
        {optionsArray.map((option, index) => (
          <li key={index}>
            <MagicButton
              as="link"
              variant="primary"
              href={option.href}
              tabIndex={isVisible ? 0 : -1}
            >
              {transformLabel(option.label)}
            </MagicButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OptionsList;
