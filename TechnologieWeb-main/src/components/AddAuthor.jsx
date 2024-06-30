import styles from "./AddAuthor.module.css";

export const AddAuthor = ({ onAdd }) => (
  <fieldset className={styles.labelBorder}>
    <form onSubmit={onAdd} className={styles.form}>
      <div className={styles.containerDiv}>
        <label htmlFor="name" className={styles.opis}>
          Name
        </label>
        <br />
        <input id="name" name="name" />
      </div>
      <div className={styles.containerDiv}>
        <label htmlFor="surname" className={styles.opis}>
          Surname
        </label>
        <br />
        <input id="surname" name="surname" />
      </div>

      <button className={styles.button}>Add Author</button>
    </form>
  </fieldset>
);
