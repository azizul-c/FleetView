import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import { MdOutlineDirectionsCar } from "react-icons/md";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-logo-and-title">
        <MdOutlineDirectionsCar />
        <h1>{title}</h1>
      </div>
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add Vehicle"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

// Not using these, but helpful for referencing later
Header.defaultProps = {
  title: "FleetView",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// You can do in-line CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black', // it's camelCase
// }

export default Header;
