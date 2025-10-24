import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const typewriterTexts = [
    "Full Stack Developer!",
    "MERN Stack Developer!",
    "React Developer!",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentFullText = typewriterTexts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
      } else {
        setCurrentText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentFullText.slice(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex]);

  const handleResumeDownload = async () => {
    const resumeUrl = getImageUrl("resume/Kartik_Garg_Resume.pdf");
    window.open(resumeUrl, "_blank");

    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Sakirul-Islam-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.greeting}>Hi, I'm</span>
          <span className={styles.name}>Kartik Garg</span>
          <span className={styles.typewriter}>
            <span className={styles.typedText}>{currentText}</span>
            <span className={styles.cursor}>|</span>
          </span>
        </h1>
        <p className={styles.description}>
          I focus on building responsive and scalable applications with clean,
          maintainable code. Skilled in the MERN stack and modern JavaScript
          frameworks, I enjoy turning ideas into real solutions. With strong
          problem-solving and teamwork, I aim to deliver impactful digital
          experiences.
        </p>
        <div className={styles.buttonGroup}>
          <button
            onClick={handleContactClick}
            className={`${styles.contactBtn} ${styles.primary}`}
          >
            <span>Connect with me</span>
            <svg
              className={styles.buttonIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleResumeDownload}
            className={`${styles.contactBtn} ${styles.secondary}`}
          >
            <span>My Resume</span>
            <svg
              className={styles.buttonIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15V3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.heroImg}>
        <div className={styles.imageContainer}>
          <img
            src={
              getImageUrl("hero/g.png") ||
              "/professional-developer-portrait.png"
            }
            alt="Kartik Garg - Full Stack Developer"
          />
          <div className={styles.imageGlow}></div>
        </div>
      </div>

      <div className={styles.backgroundElements}>
        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
        <div className={styles.gridPattern}></div>
      </div>
    </section>
  );
};
