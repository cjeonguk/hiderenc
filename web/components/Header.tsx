import Image from 'next/image';
import styles from '../styles/Header.module.css';
import icon from '../public/favicon.png';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={styles.Header}>
      <Link href="/">
        <div>
          <Image src={icon} alt="Hider Logo" width={48} height={48} />
          <code>ider</code>
        </div>
      </Link>
    </div>
  );
};

export default Header;
