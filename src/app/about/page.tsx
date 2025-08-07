import styles from "./page.module.css";
function AboutPage() {
  return (
    <div>
      <h2 className={styles.title}>About &amp; Acknowledgments</h2>

      <p>
        NextArcade is a personal side‑project built for fun and learning. I’m
        deeply grateful to the talented creators whose open resources made this
        possible:
      </p>

      {/* Graphics */}
      <section>
        <h3 className={styles.sectionTitle}>Graphics</h3>
        <ul>
          <li>
            Pixel icons used in <em>Matching Pairs</em> by{" "}
            <a
              className={styles.link}
              href="https://admurin.itch.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Admurin
            </a>
          </li>
          <li>
            3D “Magic Button” based on a design by{" "}
            <a
              className={styles.link}
              href="https://www.joshwcomeau.com/animation/3d-button/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Josh W. Comeau
            </a>
          </li>
        </ul>
      </section>

      {/* Code Inspiration */}
      <section>
        <h3 className={styles.sectionTitle}>Code Inspiration</h3>
        <p>
          <a
            className={styles.link}
            href="https://dev.to/menard_codes/i-built-a-snake-game-in-react-48b6"
            target="_blank"
            rel="noopener noreferrer"
          >
            “I built a Snake game in React”
          </a>{" "}
          by Menard Maranan and his{" "}
          <a
            className={styles.link}
            href="https://github.com/menard-codes/snakes-game/blob/main/src/SnakesGame/SnakesBoard/SnakeGame.ts"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repo
          </a>{" "}
          helped me tweak the Snake experience.
        </p>
      </section>

      {/* Audio */}
      <section>
        <h3 className={styles.sectionTitle}>Audio</h3>
        <p>
          Sound playback powered by the{" "}
          <a
            className={styles.link}
            href="https://www.npmjs.com/package/use-sound?activeTab=readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            use-sound
          </a>{" "}
          library by Josh W. Comeau.
        </p>
        <p>Individual clips:</p>
        <ul>
          <li>
            “Click” by NightDrawr —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/815037/"
              target="_blank"
              rel="noopener noreferrer"
            >
              FreeSound #815037
            </a>{" "}
            — Creative Commons 0
          </li>
          <li>
            “lightswitch-click-02” by DaUik —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/797951/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #797951
            </a>{" "}
            — Creative Commons 0
          </li>
          <li>
            “Crunch.wav” by LilMati —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/348112/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #348112
            </a>{" "}
            — Creative Commons 0
          </li>
          <li>
            “Magazine Page” by mosaichorse —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/437121/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #437121
            </a>{" "}
            — Creative Commons 0
          </li>
          <li>
            “Pistol trigger” by jriches1 —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/817928/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #817928
            </a>{" "}
            — Creative Commons 0
          </li>
          <li>
            “Click5.wav” by stijn —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/43681/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #43681
            </a>{" "}
            — Creative Commons 0
          </li>
          <li>
            “foley_cable_whoosh_air_001.wav” by soundscalpel.com —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/110615/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #110615
            </a>{" "}
            — Attribution 3.0
          </li>
          <li>
            “Ding 1” by andersmmg —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/523422/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #523422
            </a>{" "}
            — Attribution 4.0
          </li>
          <li>
            “WinMutedGuitar.wav” by Fupicat —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/521646/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #521646
            </a>{" "}
            — Creative Commons 0
          </li>
          <li>
            “negative_beeps.wav” by themusicalnomad —{" "}
            <a
              className={styles.link}
              href="https://freesound.org/s/253886/"
              target="_blank"
              rel="noopener noreferrer"
            >
              #253886
            </a>{" "}
            — Creative Commons 0
          </li>
        </ul>
      </section>

      {/* Source Code */}
      <section>
        <h3 className={styles.sectionTitle}>Source Code</h3>
        <p>
          You can explore the full source, open issues, or star the project on{" "}
          <a
            className={styles.link}
            href="https://github.com/totokartonio/next-arcade"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
