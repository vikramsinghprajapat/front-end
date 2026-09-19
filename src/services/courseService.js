import apiClient from "./apiClient";
import { v4 as uuidv4 } from "uuid";

const courseService = {

    getAll: async () => {
        const response = await apiClient.get("/courses");
        return response.data;
    },

    getById: async (id) => {
        const response = await apiClient.get(`/courses/${id}`);
        return response.data;
    },

    create: async (course) => {

        // Generate unique idempotency key
        const idempotencyKey = uuidv4();

        const response = await apiClient.post(
            "/courses",
            course,
            {
                headers: {
                    "Idempotency-Key": idempotencyKey
                }
            }
        );

        return response.data;
    },

    update: async (id, course) => {
        const response = await apiClient.put(
            `/courses/${id}`,
            course
        );
        return response.data;
    },

    delete: async (id) => {
        const response = await apiClient.delete(`/courses/${id}`);
        return response.data;
    },
};

export default courseService;