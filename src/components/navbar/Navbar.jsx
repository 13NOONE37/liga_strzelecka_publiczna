import React, { useState } from 'react';
import FocusTrap from 'focus-trap-react';
import cx from 'classnames';
import { Link, NavLink, useResolvedPath } from 'react-router-dom';
import { IconButton } from '../button/Button';

import styles from './Navbar.module.css';
import Logo from '../../assets/Logo.png';
import { ReactComponent as HamburgerIcon } from '../../assets/icons/hamburger.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
export default function Navbar() {
  const [showAside, setShowAside] = useState(false);
  return (
    <nav className={styles.nav}>
      <NavLink to={'/'} className={styles.logo}>
        <img src={Logo} />
      </NavLink>
      <div className={styles.topLinks}>
        <Links setShowAside={setShowAside} />
      </div>
      <IconButton
        icon={<HamburgerIcon />}
        style={'secondary'}
        size={'medium'}
        additionalClasses={[styles.hamburger]}
        action={() => setShowAside((prev) => !prev)}
      />
      <aside
        className={cx(styles.aside, {
          [styles['aside__show']]: showAside,
        })}
      >
        <FocusTrap active={showAside}>
          <div className={styles.asideContent}>
            <IconButton
              icon={<CloseIcon />}
              style={'secondary'}
              size={'medium'}
              additionalClasses={[styles.close]}
              action={() => setShowAside((prev) => !prev)}
            />
            <div className={styles.sideLinks}>
              <Links setShowAside={setShowAside} />
            </div>
          </div>
        </FocusTrap>
      </aside>
    </nav>
  );
}

function Links({ setShowAside }) {
  const handleHideAside = () => setShowAside(false);
  const { pathname } = useResolvedPath();
  return (
    <>
      <NavLink
        to={'/'}
        onClick={handleHideAside}
        className={cx(styles.link, {
          [styles['link__active']]: pathname === '/',
        })}
      >
        Start
      </NavLink>
      <NavLink
        to={'/generalka'}
        onClick={handleHideAside}
        className={cx(styles.link, {
          [styles['link__active']]: pathname.includes('/generalka'),
        })}
      >
        Generalka
      </NavLink>
      <NavLink
        to={'/rundy'}
        onClick={handleHideAside}
        className={cx(styles.link, {
          [styles['link__active']]: pathname.includes('/rundy'),
        })}
      >
        Rundy
      </NavLink>
      {/* <NavLink
        to={'/zawodnik'}
        onClick={handleHideAside}
        className={cx(styles.link, {
          [styles['link__active']]: pathname.includes('/zawodnik'),
        })}
      >
        Zawodnik
      </NavLink> */}
    </>
  );
}
