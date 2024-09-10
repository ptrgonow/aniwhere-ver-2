import './Header.css';
import {Link} from "react-router-dom";

function Header() {
  return (
      <header className="header">
        <nav>
          <ul className="top-nav">
            <li>
              <Link to="/"> 홈 </Link>
            </li>
            <li>
              <Link to="Register"> 회원가입 </Link>
            </li>
          </ul>
        </nav>
      </header>
  );
}

export default Header;
