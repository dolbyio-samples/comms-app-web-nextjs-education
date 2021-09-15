// Loader from https://loading.io/css/

import styles from "../styles/Loader.module.css"

export default function Loader() {
  return <div className={styles["lds-facebook"]}><div></div><div></div><div></div></div>
}