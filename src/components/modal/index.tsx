import { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "@src/lib/utils";
import "./styles.css";


interface ModalProps {
    open?: boolean;
    showMask?: boolean;
    title?: string;
    className?: string;

    onClose?: () => void;
    children: ReactNode;
}

const Modal = ({ open = false, onClose, className, showMask = true, title = "", children }: ModalProps): ReactNode => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    if(!isOpen) return null;

    return createPortal(
        <div className="flex justify-center items-center">
            {showMask && <div onClick={() => onClose?.()} className="mask"></div>}
            <div className={classNames("modal", className)}>
                <div className="header">
                    <h3 className="title">{title}</h3>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onClose?.();
                        }}
                        className="close"
                    >
                        <XMarkIcon className="h-5 w-5" strokeWidth={3} />
                    </button>
                </div>
                <div className="content">{children}</div>
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
