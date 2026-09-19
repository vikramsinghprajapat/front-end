import {
    useCallback,
    useEffect,
    useState,
} from "react";

import courseService from "../services/courseService";

const useCourses = () => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback(async () => {

        try {

            setLoading(true);
            setError(null);
            const data = await courseService.getAll();

            setCourses(data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to load courses"
            );

        } finally {

            setLoading(false);
        }

    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const createCourse = async (course) => {

        try {

            setLoading(true);
            setError(null);

            await courseService.create(course);

            await fetchCourses();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to create course"
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    const updateCourse = async (id, course) => {

        try {

            setLoading(true);
            setError(null);

            await courseService.update(id, course);

            await fetchCourses();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to update course"
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    const deleteCourse = async (id) => {

        try {

            setLoading(true);
            setError(null);

            await courseService.delete(id);

            await fetchCourses();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to delete course"
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    return {
        courses,
        loading,
        error,
        reload: fetchCourses,
        createCourse,
        updateCourse,
        deleteCourse,
    };
};

export default useCourses;