import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import courseService from "../services/courseService";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Button from "../components/common/Button";

const CourseDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [course, setCourse] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    useEffect(() => {

        const loadCourse = async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await courseService.getById(id);

                setCourse(data);

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Course not found"
                );

            } finally {

                setLoading(false);
            }
        };

        loadCourse();

    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="page">
                <ErrorMessage message={error} />

                <Button
                    onClick={() => navigate("/courses")}
                >
                    ← Back to Courses
                </Button>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="page">
                <p>Course not found.</p>
            </div>
        );
    }

    return (
        <div className="page">

            <Button
                onClick={() => navigate("/courses")}
            >
                ← Back to Courses
            </Button>

            <div className="course-details">

                <h1>
                    {course.name}
                </h1>

                <p>
                    {course.description}
                </p>

                <div className="course-detail-item">
                    <strong>Course ID:</strong>{" "}
                    {course.id}
                </div>

                <div className="course-detail-item">
                    <strong>Duration:</strong>{" "}
                    {course.duration} days
                </div>

            </div>

        </div>
    );
};

export default CourseDetails;