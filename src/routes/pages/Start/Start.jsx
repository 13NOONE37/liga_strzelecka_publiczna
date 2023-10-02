import React from 'react';
import styles from './Start.module.css';
import DefaultButton from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';

export default function Start() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <section className={styles.entrance}>
        <h1 className={styles.heading}>
          Witaj na stronie <br /> <span>Szkolnej Ligi Strzeleckiej</span>
        </h1>
        <div className={styles.photo}></div>
        <div className={styles.buttonsRow}>
          <DefaultButton
            action={() => navigate('/generalka')}
            text={'Przejdź do generalki'}
            additionalClasses={[styles.cta, styles['cta__general']]}
          />
          <DefaultButton
            action={() => navigate('/rundy')}
            text={'Przejdź do rund'}
            style={'secondary'}
            additionalClasses={[styles.cta, styles['cta__round']]}
          />
        </div>
        <h2 className={styles.aboutHeading}>O nas:</h2>
        <p className={styles.aboutText}>
          <span>
            Szkolna Liga Strzelecka to coroczny turniej organizowany pod
            patronatem władz powiatu kolskiego i Ligi Obrony Kraju.
          </span>
          <span>
            Pierwsza edycja ligi wystartowała w 2015 roku, z inicjatywy
            opiekunów kłodawskich kół strzeleckich (Zespołu Szkół
            Ponadgimnazjalnych w Kłodawie i Gimnazjum nr1 w Kłodawie). Turniej
            składa się z czterech do pięciu zawodów organizowanych przez
            uczestniczące w nim szkoły.
          </span>
          {/* Rywalizacja polega na oddaniu dziesięciu ocenianych strzałów z 10m
              do tarczy z karabinka pneumatycznego. Punkty zliczane są w 3
              klasyfikacjach indywidualnej dziewcząt i chłopców oraz drużynowej.
              Każda szkoła ma prawo wystawić do dwóch drużyn, składających się z
              trójki dziewcząt i trójki chłopców. W zawodach biorą udział
              głównie szkoły ponadpodstawowe i szkoły podstawowe z powiatu
              kolskiego. */}
        </p>
      </section>
    </div>
  );
}
