import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext.jsx";

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="navbar">

            <div className="navbar-brand">
                Course Management
            </div>

            <nav>
                <Link to="/">
                    Dashboard
                </Link>

                <Link to="/courses">
                    Courses
                </Link>

                <Link to="/enrollments">
                    Enrollments
                </Link>
                {isAuthenticated && (
                <button onClick={handleLogout}>
                    Logout
                </button>
                 )}
            </nav>

            

        </header>
    );
};

export default Navbar;