import { z } from "zod";

export const courseSchema = z.object({
    name: z
        .string()
        .min(3, "Course name must be at least 3 characters"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),

    duration: z.coerce
        .number()
        .positive("Duration must be greater than 0"),
         file: z
        .instanceof(File, { message: "Please upload a file" })
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "File size must be less than 5MB"
        )
});