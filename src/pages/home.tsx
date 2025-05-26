import styles from "./styles/home.module.css"

import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Content } from "./components/Content"

export const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <Content />
      </div>
    </div>
  )
}
