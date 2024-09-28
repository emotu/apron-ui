import { ReactNode, SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./styles.css";
import { classNames } from "@src/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label?: string;
    type?: string;
    info?: string;
    placeholder?: string;
    optionLabel?: string;
    optionValue?: string;
    isOptional?: boolean;
    options: Record<string, unknown>[];
}

const Select = ({ name, label = "", options = [], optionLabel = "name", info, optionValue = "value", ...props }: SelectProps): ReactNode => {

    const {
        register,
        getFieldState,
        formState: { errors },
    } = useFormContext();

    const fieldState = getFieldState(name);

    return (
        <fieldset className="fieldset">
            <label className="label" htmlFor={name}>
                {label}
            </label>
            <select className={classNames("select", fieldState.invalid && "has-error")} id={name} {...register(name)} {...props}>
                <>
                    <option className="text-gray-300" value={""}>{""}</option>
                    {options?.map((opt, idx) => {
                        const optLabel = opt[optionLabel] as string;
                        const optValue = opt[optionValue] as string;

                        return (
                            <option key={`option-${idx}`} value={optValue}>
                                {optLabel}
                            </option>
                        );
                    })}
                </>
            </select>
            {fieldState.isTouched && !fieldState.error && Boolean(info) && <span className="info">{info}</span>}
            <ErrorMessage errors={errors} name={name} render={({ message }) => <span className="error">{message}</span>} />
        </fieldset>
    );
};

export default Select;
