import { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import styles from "./Contact.module.css";

export const Contact = () => {
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        event.target.reset();

        setTimeout(() => {
          setResult("");
        }, 1000);
      } else {
        console.error("Error:", data);
        setResult(data.message);

        setTimeout(() => {
          setResult("");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Something went wrong. Try again!");
    }
  };

  return (
    <section id="contact" className={styles.container}>
      <div className={styles.content}>
        {/* LEFT SECTION */}
        <div className={styles.leftSection}>
          <h2 className={styles.title}>Let's talk</h2>
          <p className={styles.description}>
            I'm currently available to take on new projects, so feel free to
            send me a message about anything that you want me to work on.
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <MdEmail size={24} />
              </div>
              <span className={styles.contactLabel}>
                work.kartikgarg@gmail.com
              </span>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <MdPhone size={24} />
              </div>
              <span className={styles.contactLabel}>+91-9399327490</span>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <MdLocationOn size={24} />
              </div>
              <span className={styles.contactLabel}>Gwalior, India</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className={styles.rightSection}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Write your message here
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                className={styles.formTextarea}
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>

          {/* Result message */}
          {result && <p className={styles.resultMessage}>{result}</p>}
        </div>
      </div>
    </section>
  );
};
