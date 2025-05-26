import { useThemeStore } from "../../store/useStore"
import styles from "../styles/header.module.css"

export const Header: React.FC = () => {
  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  )
  return (
    <header className={styles.header}>
      <h1
        className={styles.title}
        onClick={() => toggleTheme()}
      >
        Ravn Rick and Morty Registry
      </h1>
    </header>
  )
}
