import styles from "../styles/loadingScreen.module.css"
import logo from "../../assets/logo.png"
export const LoadingScreen = () => {
  return (
    <div className={styles.loading}>
      <img className={styles.image} src={logo} alt="logo" />
      <h2 className={styles.text}>Loading...</h2>
    </div>
  )
}
