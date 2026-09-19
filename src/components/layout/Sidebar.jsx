import { NavLink } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext.jsx";


const Sidebar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
const navigate = useNavigate();
     const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <aside className="sidebar">

            <h3>
                Menu
            </h3>

            <nav className="sidebar-menu">

                <NavLink to="/">
                    Dashboard
                </NavLink>

                <NavLink to="/courses">
                    Courses
                </NavLink>

                <NavLink to="/enrollments">
                    Enrollments
                </NavLink>
                 {isAuthenticated && (
                <button onClick={handleLogout}>
                    Logout
                </button>
            )}

            </nav>

        </aside>
    );
};

export default Sidebar;