import CourseCard from "./CourseCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

const CourseList = ({
    courses,
    loading,
    error,
    onEdit,
    onDelete,
    onView,
}) => {

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <ErrorMessage message={error} />
        );
    }

    if (!courses.length) {
        return (
            <p>
                No courses found.
            </p>
        );
    }

    return (
        <div className="course-grid">

            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                />
            ))}

        </div>
    );
};

export default CourseList;