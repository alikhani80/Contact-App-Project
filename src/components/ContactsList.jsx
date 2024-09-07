import { useState } from "react";
import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";

function ContactsList({ contacts, setContacts, deleteHandler, editHandler }) {
  const [selectedContacts, setSelectedContacts] = useState(new Set());

  const handleSelect = (id) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleBulkDelete = () => {
    const selectedIds = [...selectedContacts];
    setContacts(prevContacts => 
      prevContacts.filter(contact => !selectedIds.includes(contact.id))
    );
    setSelectedContacts(new Set());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Contact List</h3>
        <button 
          className={styles.deleteSelected} 
          onClick={handleBulkDelete} 
          disabled={selectedContacts.size === 0} 
        >
          delete selected contacts
        </button>
      </div>
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.contactItem}>
              <input
                type="checkbox"
                checked={selectedContacts.has(contact.id)}
                onChange={() => handleSelect(contact.id)}
              />
              <ContactItem
                data={contact}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Contacts Yet</p>
      )}
    </div>
  );
}

export default ContactsList;
