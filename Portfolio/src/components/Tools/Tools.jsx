import tools from "../../data/tools.json";
import styles from "./Tools.module.css";
import { getImageUrl } from "../../utils";


export const Tools = () => {
  return (
    <section className={styles.container} id="skills">
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h2 className={styles.title}>Tools</h2>
        <div className={styles.skillsRow}>
          {tools.map((tool, id) => (
            <div
              key={id}
              className={styles.skillCard}
              data-skill={tool.dataSkill}
            >
              <div className={styles.skillIcon}>
                <img
                  src={getImageUrl(tool.imageSrc) || "/placeholder.svg"}
                  alt={tool.title}
                />
              </div>
              <h3 className={styles.skillName}>{tool.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
