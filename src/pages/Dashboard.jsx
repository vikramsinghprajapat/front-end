import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Welcome to the Course Management System.
                    </p>
                </div>
            </div>

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <h2>Courses</h2>
                    <p>
                        Manage available courses.
                    </p>

                    <Link to="/courses">
                        Manage Courses →
                    </Link>
                </div>

                <div className="dashboard-card">
                    <h2>Enrollments</h2>
                    <p>
                        Manage student enrollments.
                    </p>

                    <Link to="/enrollments">
                        Manage Enrollments →
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;