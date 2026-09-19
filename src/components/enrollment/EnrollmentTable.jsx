import Button from "../common/Button";

const EnrollmentTable = ({
    enrollments,
    loading,
    error,
    onDelete,
}) => {

    if (loading) {
        return <p>Loading enrollments...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!Array.isArray(enrollments) || enrollments.length === 0) {
        return <p>No enrollments found.</p>;
    }

    return (
        <div className="table-container">

            <table className="data-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Duration</th>
                        <th>Enrolled At</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {enrollments.map((enrollment) => (

                        <tr key={enrollment.id}>

                            <td>
                                {enrollment.id}
                            </td>

                            <td>
                                {enrollment.studentName}
                            </td>

                            <td>
                                {enrollment.studentEmail}
                            </td>

                            <td>
                                {enrollment.course?.name || "-"}
                            </td>

                            <td>
                                {enrollment.course?.duration
                                    ? `${enrollment.course.duration} hours`
                                    : "-"
                                }
                            </td>

                            <td>
                                {enrollment.enrollAt
                                    ? new Date(
                                        enrollment.enrollAt
                                    ).toLocaleString()
                                    : "-"
                                }
                            </td>

                            <td>

                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        onDelete(enrollment.id)
                                    }
                                >
                                    Delete
                                </Button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default EnrollmentTable;