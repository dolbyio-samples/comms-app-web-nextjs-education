import Head from 'next/head'
import SubmitJobForm from "../components/SubmitJobForm"
import QualityAssessment from "../components/QualityAssessment"
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Education App with Dolby.io</title>
        <meta name="description" content="Quality assurance for educational videos" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Education App with <a href="https://dolby.io">Dolby.io!</a>
        </h1>
        <p className={styles.description}>
          This app will allow you to run quality assurance on educational videos.
          <br />
          To start, please submit a video.
        </p>

        <section className={styles.section}>
          <h2>Submit Video</h2>
          <p>Submit the URL to your educational video here.</p>
          <SubmitJobForm />
        </section>

        <section className={styles.section}>
          <h2>Quality Assessment</h2>
          <p>Once the job has successfully completed, perform a quality assessment on it here.</p>
          <QualityAssessment />
        </section>
      </main>
      <footer className={styles.footer}>
        Powered by Next.js and Dolby.io. Template based on <span className={styles.code}>create-next-app</span>
      </footer>
    </div>
  )
}
