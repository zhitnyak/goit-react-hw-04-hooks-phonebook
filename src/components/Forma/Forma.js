import React, { useState } from "react";
import css from "./Forma.module.css";

const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;

      // switch (e.currentTarget.name) {
      //   case "e.currentTarget.name":
      //     setName(e.currentTarget.value);
      //     break;
      //   case "e.currentTarget.number":
      //     setNumber(e.currentTarget.value);
      //     break;
      //   // [e.currentTarget.name]: e.currentTarget.number,
      //   // [name]: value,
      default:
        return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </label>
      <button className={css.btn}>Add contact</button>
    </form>
  );
};
export default Form;
