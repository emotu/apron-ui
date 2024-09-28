import { ReactNode, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./styles.css";
import { classNames } from "@src/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    info?: string;
    type?: string;
    format?: (val: unknown) => string;
}

const Input = ({ name, label = "", type = "text", info, ...props }: InputProps): ReactNode => {
    const {
        register,
        getFieldState,
        formState: { errors },
    } = useFormContext();

    const fieldState = getFieldState(name);
    
    return (
        <fieldset className="fieldset">
            <label htmlFor={name}>{label}</label>
            <input {...register(name)} className={classNames("input", fieldState.invalid && "has-error")} type={type} {...props} />
            {fieldState.isTouched && !fieldState.error && Boolean(info) && <span className="info">{info}</span>}
            <ErrorMessage errors={errors} name={name} render={({ message }) => <span className="error">{message}</span>} />
        </fieldset>
    );
};

export default Input;
