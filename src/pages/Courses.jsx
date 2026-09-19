import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseList from "../components/course/CourseList";
import CourseForm from "../components/course/CourseForm";
import Button from "../components/common/Button";
import useCourses from "../hooks/useCourses";

const Courses = () => {

    const navigate = useNavigate();

    const {
        courses,
        loading,
        error,
        createCourse,
        updateCourse,
        deleteCourse,
    } = useCourses();

    const [showForm, setShowForm] = useState(false);

    const [selectedCourse, setSelectedCourse] =
        useState(null);

    const handleAdd = () => {
        setSelectedCourse(null);
        setShowForm(true);
    };

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setShowForm(true);
    };

    const handleSubmit = async (data) => {

        try {

            if (selectedCourse) {

                await updateCourse(
                    selectedCourse.id,
                    data
                );

            } else {

                await createCourse(data);
            }

            setShowForm(false);
            setSelectedCourse(null);

        } catch (error) {

            console.error(
                "Course operation failed:",
                error
            );
        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteCourse(id);

        } catch (error) {

            console.error(
                "Delete failed:",
                error
            );
        }
    };

    const handleView = (id) => {
        navigate(`/courses/${id}`);
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedCourse(null);
    };

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <h1>Courses</h1>

                    <p>
                        Create, update and manage courses.
                    </p>
                </div>

                <Button onClick={handleAdd}>
                    + Add Course
                </Button>

            </div>

            {showForm && (
                <CourseForm
                    course={selectedCourse}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={loading}
                />
            )}

            <CourseList
                courses={courses}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

        </div>
    );
};

export default Courses;