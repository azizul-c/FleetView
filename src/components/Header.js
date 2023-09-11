import { useLocation, Link } from "react-router-dom";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { TbBulb } from 'react-icons/tb';
import { IoIosArrowRoundBack } from 'react-icons/io';

const Header = ({ title }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-logo-and-title">
        <MdOutlineDirectionsCar />
        <h1>{title}</h1>
      </div>
      {location.pathname === "/" && (
        <Link to="/about"><p><TbBulb />About</p></Link>)}
      {location.pathname === "/about" && (
        <Link to="/"><p><IoIosArrowRoundBack />Back to Home</p></Link>)}
    </header>
  );
};

export default Header;
