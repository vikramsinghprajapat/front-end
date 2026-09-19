const Input = ({
    label,
    name,
    type = "text",
    register,
    error,
    placeholder,
}) => {
    return (
        <div className="form-group">

            <label htmlFor={name}>
                {label}
            </label>

            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
            />

            {error && (
                <span className="field-error">
                    {error.message}
                </span>
            )}

        </div>
    );
};

export default Input;