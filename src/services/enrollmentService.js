import apiClient from "./apiClient";

const enrollmentService = {

    getAll: async () => {
        const response = await apiClient.get("/enrollments");
        return response.data;
    },

    getById: async (id) => {
        const response = await apiClient.get(`/enrollments/${id}`);
        return response.data;
    },

    create: async (enrollment) => {
        const response = await apiClient.post(
            "/enrollments",
            enrollment
        );

        return response.data;
    },

    delete: async (id) => {
        const response = await apiClient.delete(
            `/enrollments/${id}`
        );

        return response.data;
    },
};

export default enrollmentService;