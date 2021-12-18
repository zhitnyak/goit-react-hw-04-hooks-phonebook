import { useState, useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Form from "./components/Forma/Forma";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem("contacts"));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    let unicName = contacts.find((contact) => contact.name === name);

    if (unicName) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts((prevState) => [
        { id: nanoid(), name, number },
        ...prevState,
      ]);
    }
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <>
      <section className="wrapper">
        <h1 className="title">Phonebook</h1>
        <Form onSubmit={addContact} />
        <h2 className="title">Contacts</h2>
        {contacts.length === 0 ? null : (
          <Filter value={filter} onChange={changeFilter} />
        )}
        <ContactList contacts={getVisibleContacts()} onChange={deleteContact} />
      </section>
    </>
  );
}

export default App;
