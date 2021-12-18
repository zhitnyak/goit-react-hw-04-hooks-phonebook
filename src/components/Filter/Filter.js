import PropTypes from "prop-types";
import css from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <div className={css.box}>
    <label className={css.contact}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </label>
  </div>
);
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Filter;
