import React from 'react';
import Logo from '../../../assets/Logo.png';
import styles from './Start.module.css';

export default function Start() {
  return (
    <div className={styles.container}>
      <section className={styles.entrance}>
        <h1>
          Witaj na stronie <br /> <span>Szkolnej Ligi Strzeleckiej</span>
        </h1>
        <img src={Logo} />
        <button>Generalka</button>
        <button>Rundy</button>
      </section>

      <section className={styles.about}>
        <h2>O nas:</h2>
        <p>
          <ul>
            <li>
              Szkolna Liga Strzelecka to coroczny turniej organizowany pod
              patronatem władz powiatu kolskiego i Ligi Obrony Kraju.
            </li>
            <li>
              Pierwsza edycja ligi wystartowała w 2015 roku, z inicjatywy
              opiekunów kłodawskich kół strzeleckich (Zespołu Szkół
              Ponadgimnazjalnych w Kłodawie i Gimnazjum nr1 w Kłodawie).
            </li>

            <li>
              W zawodach biorą udział głównie szkoły ponadpodstawowe i szkoły
              podstawowe z powiatu kolskiego.
            </li>
          </ul>
        </p>
      </section>
      <section className={styles.about}>
        <h2>O turnieju:</h2>
        <p>
          <ul>
            <li>
              Turniej składa się z czterech do pięciu zawodów organizowanych
              przez uczestniczące w nim szkoły.
            </li>
            <li>
              Rywalizacja polega na oddaniu dziesięciu ocenianych strzałów z 10m
              do tarczy z karabinka pneumatycznego.
            </li>
            <li>
              Punkty zliczane są w 3 klasyfikacjach indywidualnej dziewcząt i
              chłopców oraz drużynowej.
            </li>
            <li>
              Każda szkoła ma prawo wystawić do dwóch drużyn, składających się z
              trójki dziewcząt i trójki chłopców.
            </li>
          </ul>
        </p>
      </section>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.waveTop}
      >
        <path
          fill="#605cff"
          fill-opacity="0.05"
          d="M0,128L26.7,144C53.3,160,107,192,160,202.7C213.3,213,267,203,320,202.7C373.3,203,427,213,480,186.7C533.3,160,587,96,640,58.7C693.3,21,747,11,800,21.3C853.3,32,907,64,960,85.3C1013.3,107,1067,117,1120,133.3C1173.3,149,1227,171,1280,165.3C1333.3,160,1387,128,1413,112L1440,96L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.waveTop}
      >
        <path
          fill="#605cff"
          fill-opacity="0.1"
          d="M0,32L13.3,69.3C26.7,107,53,181,80,229.3C106.7,277,133,299,160,304C186.7,309,213,299,240,293.3C266.7,288,293,288,320,261.3C346.7,235,373,181,400,170.7C426.7,160,453,192,480,186.7C506.7,181,533,139,560,128C586.7,117,613,139,640,165.3C666.7,192,693,224,720,229.3C746.7,235,773,213,800,186.7C826.7,160,853,128,880,133.3C906.7,139,933,181,960,165.3C986.7,149,1013,75,1040,48C1066.7,21,1093,43,1120,64C1146.7,85,1173,107,1200,138.7C1226.7,171,1253,213,1280,245.3C1306.7,277,1333,299,1360,272C1386.7,245,1413,171,1427,133.3L1440,96L1440,0L1426.7,0C1413.3,0,1387,0,1360,0C1333.3,0,1307,0,1280,0C1253.3,0,1227,0,1200,0C1173.3,0,1147,0,1120,0C1093.3,0,1067,0,1040,0C1013.3,0,987,0,960,0C933.3,0,907,0,880,0C853.3,0,827,0,800,0C773.3,0,747,0,720,0C693.3,0,667,0,640,0C613.3,0,587,0,560,0C533.3,0,507,0,480,0C453.3,0,427,0,400,0C373.3,0,347,0,320,0C293.3,0,267,0,240,0C213.3,0,187,0,160,0C133.3,0,107,0,80,0C53.3,0,27,0,13,0L0,0Z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.waveBottom}
      >
        <path
          fill="#605cff"
          fill-opacity="0.05"
          d="M0,128L18.5,154.7C36.9,181,74,235,111,250.7C147.7,267,185,245,222,240C258.5,235,295,245,332,218.7C369.2,192,406,128,443,138.7C480,149,517,235,554,224C590.8,213,628,107,665,58.7C701.5,11,738,21,775,64C812.3,107,849,181,886,197.3C923.1,213,960,171,997,144C1033.8,117,1071,107,1108,122.7C1144.6,139,1182,181,1218,186.7C1255.4,192,1292,160,1329,160C1366.2,160,1403,192,1422,208L1440,224L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.waveBottom}
      >
        <path
          fill="#605cff"
          fill-opacity="0.1"
          d="M0,288L18.5,266.7C36.9,245,74,203,111,165.3C147.7,128,185,96,222,90.7C258.5,85,295,107,332,106.7C369.2,107,406,85,443,96C480,107,517,149,554,181.3C590.8,213,628,235,665,213.3C701.5,192,738,128,775,133.3C812.3,139,849,213,886,240C923.1,267,960,245,997,240C1033.8,235,1071,245,1108,234.7C1144.6,224,1182,192,1218,202.7C1255.4,213,1292,267,1329,250.7C1366.2,235,1403,149,1422,106.7L1440,64L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
