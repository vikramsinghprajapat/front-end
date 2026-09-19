import EnrollmentTable from "../components/enrollment/EnrollmentTable";
import useEnrollments from "../hooks/useEnrollments";

const Enrollments = () => {

    const {
        enrollments,
        loading,
        error,
        deleteEnrollment,
    } = useEnrollments();

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this enrollment?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteEnrollment(id);

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <h1>Enrollments</h1>

                    <p>
                        Manage student course enrollments.
                    </p>
                </div>

            </div>

            <EnrollmentTable
                enrollments={enrollments}
                loading={loading}
                error={error}
                onDelete={handleDelete}
            />

        </div>
    );
};

export default Enrollments;