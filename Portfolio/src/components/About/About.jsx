import { FaPaintBrush, FaServer, FaDatabase, FaFigma } from "react-icons/fa";
import styles from "./About.module.css";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About Me</h2>
      <div className={styles.content}>
        <div className={styles.skillsGrid}>
          <div className={styles.skillItem}>
            <div className={styles.skillIcon}>
              <FaPaintBrush size={32} />
            </div>
            <div className={styles.skillContent}>
              <h3>Frontend Development</h3>
              <p>
                Crafting visually appealing and user-friendly interfaces using
                HTML, CSS, and JavaScript frameworks.
              </p>
            </div>
          </div>

          <div className={styles.skillItem}>
            <div className={styles.skillIcon}>
              <FaServer size={32} />
            </div>
            <div className={styles.skillContent}>
              <h3>Backend Development</h3>
              <p>
                Building and maintaining server-side application logic using
                Node.js, Express.js, and databases like MongoDB.
              </p>
            </div>
          </div>

          <div className={styles.skillItem}>
            <div className={styles.skillIcon}>
              <FaDatabase size={32} />
            </div>
            <div className={styles.skillContent}>
              <h3>Database Management</h3>
              <p>
                Managing, optimizing, and securing databases to ensure efficient
                data retrieval and storage.
              </p>
            </div>
          </div>

          <div className={styles.skillItem}>
            <div className={styles.skillIcon}>
              <FaFigma size={32} />
            </div>
            <div className={styles.skillContent}>
              <h3>UI Design</h3>
              <p>
                I have designed multiple landing pages and have created design
                systems as well.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
