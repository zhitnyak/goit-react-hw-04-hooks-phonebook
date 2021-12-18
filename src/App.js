import React, { Component } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Form from "./components/Forma/Forma";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");

    console.log(contacts);

    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //проверяем заполненность поля иначе зациклится компонент

    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
    console.log(prevState);
    console.log(this.state);
  }

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  addContact = ({ name, number }) => {
    let unicName = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (unicName) {
      alert(`${unicName.name} is already in contacts`);
    } else {
      // const userId = nanoid();
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, { id: nanoid(), name, number }],
      }));
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };
  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    return (
      <section className="wrapper">
        <h1 className="title">Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2 className="title">Contacts</h2>
        {this.state.contacts.length === 0 ? null : (
          <Filter value={filter} onChange={this.changeFilter} />
        )}
        <ContactList contacts={visibleContacts} onChange={this.deleteContact} />
      </section>
    );
  }
}

export default App;
