import styles from './Layout.module.css'
import Head from 'next/head'

export const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <div className={styles.content}>
        {children}
        <div className={styles.footer}>
          <div style={{ textAlign: 'center' }}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
      </div>
    </>
  )
}
