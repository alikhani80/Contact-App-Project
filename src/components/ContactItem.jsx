import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  deleteHandler,
  editHandler,
}) {
  return (
    <li className={styles.item}>
      <p className={styles.name}>{name}</p>
      <p className={styles.lastName}>{lastName}</p>
      <p className={styles.email}>
        <span>📥</span>
        {email}
      </p>
      <p className={styles.phone}>
        <span>📱</span> {phone}
      </p>
      <div className={styles.actions}>
        <button onClick={() => deleteHandler(id)}>🗑️</button>
        <button onClick={() => editHandler(id)}>🖊️</button>
      </div>
    </li>
  );
}

export default ContactItem;
