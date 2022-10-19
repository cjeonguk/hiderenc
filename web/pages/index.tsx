import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hider - Make your files unreadable</title>
      </Head>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">Hider</Link>
        </h1>

        <p className={styles.description}>Make your files unreadable</p>

        <div className={styles.grid}>
          <a
            href="https://github.com/cjeonguk/hider/releases/latest"
            className={styles.card}
          >
            <h2>Downloads &rarr;</h2>
            <p>Download the latest release of Hider</p>
          </a>

          <a href="/" className={styles.card}>
            <div>
              <h2>Documentation &rarr;</h2>
              <p>Learn more about Hider (CLI)</p>
            </div>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
