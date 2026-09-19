import Button from "../common/Button";

const CourseCard = ({
    course,
    onEdit,
    onDelete,
    onView,
}) => {

    return (
        <div className="course-card">

            <div className="course-card-header">

                <h3>
                    {course.name}
                </h3>

                <span>
                    #{course.id}
                </span>

            </div>

            <p>
                {course.description}
            </p>

            <p>
                <strong>Duration:</strong>{" "}
                {course.duration} days
            </p>

            <div className="course-actions">

                <Button
                    onClick={() => onView(course.id)}
                >
                    View
                </Button>

                <Button
                    onClick={() => onEdit(course)}
                >
                    Edit
                </Button>

                <Button
                    variant="danger"
                    onClick={() => onDelete(course.id)}
                >
                    Delete
                </Button>

            </div>

        </div>
    );
};

export default CourseCard;