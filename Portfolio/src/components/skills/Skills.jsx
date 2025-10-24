import skills from "../../data/skills.json";
import styles from "./Skills.module.css";
import { getImageUrl } from "../../utils";


export const Skills = () => {
  return (
    <section className={styles.container} id="skills">
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h2 className={styles.title}>Technical Skills</h2>
        <div className={styles.skillsRow}>
          {skills.map((skill, id) => (
            <div
              key={id}
              className={styles.skillCard}
              data-skill={skill.dataSkill}
            >
              <div className={styles.skillIcon}>
                <img
                  src={getImageUrl(skill.imageSrc) || "/placeholder.svg"}
                  alt={skill.title}
                />
              </div>
              <h3 className={styles.skillName}>{skill.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
