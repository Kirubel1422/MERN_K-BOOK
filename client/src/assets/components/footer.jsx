import { Link } from "react-router-dom";
import { FaInstagram, FaMeta, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="py-3 md:py-5">
      <div className="flex justify-center gap-4 flex-col items-center">
        <div>
          <h1 className="text-lg md:text-xl  font-bold">K-BOOK</h1>
        </div>
        <div>
          <span className="block">Socials</span>
          <ul className="flex gap-3">
            <li>
              <Link to="#">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaMeta />
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaXTwitter />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Copyright 2023</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
