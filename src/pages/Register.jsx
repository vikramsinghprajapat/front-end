import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

import { registerSchema } from "../schemas/registerSchema";
import authService from "../services/authService";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Register = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "USER",
        },
    });

    const onSubmit = async (data) => {

        try {

            console.log("Register data:", {
                name: data.name,
                email: data.email,
                role: data.role,
            });

            const response =
                await authService.register(data);

            console.log(
                "Registration successful:",
                response
            );

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );

            if (error.response?.data) {
                alert(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Registration failed"
                );
            } else {
                alert("Unable to connect to server");
            }
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h2>Create Account</h2>

                <p className="auth-subtitle">
                    Register for Course Management System
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        register={register}
                        error={errors.name}
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        register={register}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        register={register}
                        error={errors.password}
                    />

                    <div className="form-group">

                        <label htmlFor="role">
                            Role
                        </label>

                        <select
                            id="role"
                            {...register("role")}
                        >
                            <option value="USER">
                                User
                            </option>

                            <option value="ADMIN">
                                Admin
                            </option>
                        </select>

                        {errors.role && (
                            <p className="error-message">
                                {errors.role.message}
                            </p>
                        )}

                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Registering..."
                            : "Register"}
                    </Button>

                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;