import { useState } from "react";
import ContactsList from "./ContactsList";
import inputs from "../Constants/inputs";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({ id: "", name: "", lastName: "", email: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{11}$/;

  const deleteHandler = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const editHandler = (id) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    setContact(contactToEdit);
    setIsEditing(true);
  };

  const saveHandler = () => {
    if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
      setAlert("Please enter all fields.");
      return;
    }
    if (!emailRegex.test(contact.email)) {
      setAlert("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(contact.phone)) {
      setAlert("Please enter a valid phone number.");
      return;
    }

    setAlert("");
    if (isEditing) {
      setContacts(prevContacts => prevContacts.map(c => (c.id === contact.id ? contact : c)));
      setIsEditing(false);
    } else {
      setContacts(prevContacts => [...prevContacts, { ...contact, id: v4() }]);
    }
    setContact({ name: "", lastName: "", email: "", phone: "" });
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm) ||
    contact.lastName.toLowerCase().includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}
        <button onClick={saveHandler}>{isEditing ? "Save Changes" : "Add Contact"}</button>
        {isEditing && <button onClick={() => setIsEditing(false)}>BACK</button>}
      </div>
      <input 
        type="text" 
        placeholder="Search contact" 
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <ContactsList 
        contacts={filteredContacts} 
        setContacts={setContacts} 
        deleteHandler={deleteHandler} 
        editHandler={editHandler} 
      />
    </div>
  );
}

export default Contacts;
