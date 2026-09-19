import {
    useCallback,
    useEffect,
    useState,
} from "react";

import enrollmentService from "../services/enrollmentService";

const useEnrollments = () => {

    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEnrollments = useCallback(async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await enrollmentService.getAll();

            setEnrollments(
                Array.isArray(data) ? data : []
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to load enrollments"
            );

        } finally {

            setLoading(false);
        }

    }, []);

    useEffect(() => {
        fetchEnrollments();
    }, [fetchEnrollments]);

    const createEnrollment = async (enrollment) => {

        try {

            setLoading(true);
            setError(null);

            await enrollmentService.create(enrollment);

            await fetchEnrollments();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to create enrollment"
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    const deleteEnrollment = async (id) => {

        try {

            setLoading(true);
            setError(null);

            await enrollmentService.delete(id);

            await fetchEnrollments();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to delete enrollment"
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };

    return {
        enrollments,
        loading,
        error,
        reload: fetchEnrollments,
        createEnrollment,
        deleteEnrollment,
    };
};

export default useEnrollments;