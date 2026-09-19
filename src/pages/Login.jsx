import {useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { loginSchema } from "../schemas/loginSchema";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import authService from "../services/authService";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginError,setLoginError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try{ 
            const response = await authService.login(data);
            login(response.token); 
            navigate("/"); 
        } catch (error){ 
            setLoginError(error.response?.data?.message)
       } 
    };

    return (
        <div className="login-page">

            <div className="login-container">

                {/* Left Section */}
                <div className="login-brand">

                    <div className="brand-content">

                        <div className="brand-icon">
                            📚
                        </div>

                        <h1>Course Management</h1>
                       
                        <p> 
                            Manage your courses, students and
                            enrollments from one simple platform.
                        </p>

                        <div className="brand-features">
                            <div>✓ Manage Courses</div>
                            <div>✓ Student Enrollment</div>
                            <div>✓ Track Learning</div>
                        </div>

                    </div>

                </div>

                {/* Right Section */}
                <div className="login-form-container">

                    <div className="login-form">

                        <h2>Welcome Back 👋</h2>
                         {loginError &&(
                            <p className="error-message">
                                {loginError}
                            </p>
                            )
                        }
                        <p className="login-subtitle">
                            Login to your account
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)}>

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

                    <div className="login-options">

                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>

                    </div>

                    <Button type="submit">
                        Login
                    </Button>

                </form>

                        <div className="login-footer">
                            <p>
                                Don't have an account?
                                <Link to="/register">
                                    Register
                                </Link>

                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;

