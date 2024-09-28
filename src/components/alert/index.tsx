import { ReactNode } from "react";
import Modal from "../modal";
import Button from "../fields/Button";

interface AlertProps {
    title?: string;
    message?: string;
    obj: object;
    isOpen?: boolean;
    onConfirm: (obj: object) => void;
    onCancel: () => void; 
}

const Alert = ({ title = "", message = "", obj, isOpen, onConfirm, onCancel }: AlertProps): ReactNode => {
    return (
        <Modal title={title} open={isOpen} onClose={() => onCancel?.()}>
            <div className="w-full flex flex-col space-y-8 justify-between items-center">
                <div className="py-4">
                    <p className="text-2xl tracking-tight font-bold">{message}</p>
                </div>
                <div className="flex flex-col py-4 space-y-2 w-full justify-center items-center">
                    <Button onPressed={() => onConfirm(obj)} className="bg-red-500 py-3 border-red-500 w-full rounded-lg">
                        {"DELETE"}
                    </Button>
                    <Button onPressed={onCancel} className="!bg-transparent w-full py-3 border-neutral-300 !text-black rounded-lg">
                        {"CANCEL"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default Alert;