import styles from './Toolbar.module.css'

export const Toolbar = ({ children }) => {
  return <div className={styles.toolbar}>
    { children }
  </div>
}

/* <div className={styles['user-info']}>
        <img src={img} alt={''} />
        {nickname}
      </div>
      <div className={styles['logout-button']} onClick={() => router.push('/api/auth/logout')}>
        <img src="/logout.svg" alt="logout" width='40' />
      </div> */
