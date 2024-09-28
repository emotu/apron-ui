import { ReactNode } from "react";
import { classNames } from "@src/lib/utils";
import "./styles.css";

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    disabled?: boolean;
    onPressed?: () => void;
    children: ReactNode;
}

const Button = ({ onPressed, type = "button", className, disabled, children }: ButtonProps): ReactNode => {
    const onClick = () => {
        onPressed?.();
    };
    
    return (
        <button disabled={disabled} className={classNames('button', className)} type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
