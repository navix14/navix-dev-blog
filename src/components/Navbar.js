import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import MainContext from "../context/AppContext";

function Navbar() {
    const links = ["Home", "Projects", "Blog", "Contact"];
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const context = useContext(MainContext);

    const handleMenuToggle = () => {
        setMobileMenuOpen((prev) => !prev);
    }

    const handleDarkModeToggle = () => {
        context.toggleDarkMode();
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to={"/"} >
                    <h1 className="logo">navix<span>.</span>dev</h1>
                </Link>
            </div>
            <div className="links">
                {links.map((link, index) => (
                    <NavLink
                        to={`${link.toLowerCase()}`}
                        className={({ isActive, isPending }) => isActive ? "active-link" : ""}
                        key={index}
                    >
                        {link}
                    </NavLink>
                ))}
                <div className="dark-mode">
                    {context.darkMode ?
                        <MdOutlineDarkMode size={20} onClick={handleDarkModeToggle} /> :
                        <MdDarkMode size={20} onClick={handleDarkModeToggle} />
                    }
                </div>
            </div>
            <div className="mobile-menu">
                {context.darkMode ?
                    <MdOutlineDarkMode size={30} onClick={handleDarkModeToggle} /> :
                    <MdDarkMode size={30} onClick={handleDarkModeToggle} />
                }
                <FaBars onClick={handleMenuToggle} size={35} className={mobileMenuOpen ? "open" : ""} />
            </div>
            <div className={`mobile-links ${mobileMenuOpen ? 'open' : ''}`}>
                {links.map((link, index) => (
                    <NavLink
                        to={`${link.toLowerCase()}`}
                        className={({ isActive, isPending }) => isActive ? "active-link" : ""}
                        key={index}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {link}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;