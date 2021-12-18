import React from "react";
import PropTypes from "prop-types";
import css from "./ContactList.module.css";

const ContactList = ({ contacts, onChange }) => {
  return (
    <ul className={css.list}>
      {contacts.length > 0 &&
        contacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            {`${name}: ${number}`}
            <button
              className={css.btn}
              type="button"
              onClick={() => onChange(id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default ContactList;
