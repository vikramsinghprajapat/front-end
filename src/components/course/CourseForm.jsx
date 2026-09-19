import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { courseSchema } from "../../schemas/courseSchema";
import Input from "../common/Input";
import Button from "../common/Button";

const CourseForm = ({
    course,
    onSubmit,
    onCancel,
    loading = false,
}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm({
        resolver: zodResolver(courseSchema),

        defaultValues: {
            name: "",
            description: "",
            duration: "",
            file:""
        },
    });

    useEffect(() => {

        if (course) {

            reset({
                name: course.name,
                description: course.description,
                duration: course.duration,
                file:course.file
            });

        } else {

            reset({
                name: "",
                description: "",
                duration: "",
            });
        }

    }, [course, reset]);

    const submitHandler = (data) => {
        onSubmit(data);
    };

    return (
        <form
            className="course-form"
            onSubmit={handleSubmit(submitHandler)}
        >

            <h2>
                {course ? "Edit Course" : "Add Course"}
            </h2>

            <Input
                label="Course Name"
                name="name"
                register={register}
                error={errors.name}
                placeholder="Enter course name"
            />

            <div className="form-group">

                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    rows="4"
                    placeholder="Enter course description"
                    {...register("description")}
                />

                {errors.description && (
                    <span className="field-error">
                        {errors.description.message}
                    </span>
                )}

            </div>

            <Input
                label="Duration (days)"
                name="duration"
                type="number"
                register={register}
                error={errors.duration}
                placeholder="Enter duration"
            />
            <Input
                label="Upload Course"
                name="file"
                type="file"
                register={register}
                error={errors.file}
                placeholder="Enter file"
            />

            <div className="form-actions">

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : course
                            ? "Update Course"
                            : "Create Course"
                    }
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

            </div>

        </form>
    );
};

export default CourseForm;