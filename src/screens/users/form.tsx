import * as Yup from "yup";
import { Modal, Button, Input, Select } from "@src/components";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";

interface FormProps {
    title?: string;
    isOpen?: boolean;
    initialValues?: object | null;
    onSave?: (values: object) => void;
    onCancel?: () => void;
}

enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

const MaxAgeRules: Record<string, Record<string, number>> = {
    MALE: { min: 18, max: 112 },
    FEMALE: { min: 18, max: 117 },
};

const genderOptions = Object.values(Gender).map((value) => ({ name: _.capitalize(value), value }));

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(5, "First name must be at least 5 characters")
        .max(20, "First name must be at most 20 characters")
        .required("First name is required"),
    lastName: Yup.string()
        .min(5, "Last name must be at least 5 characters")
        .max(20, "Last name must be at most 20 characters")
        .required("Last name is required"),
    gender: Yup.string().oneOf(Object.values(Gender)).required("Gender is required"),
    age: Yup.number()
        .transform((value, initialValue) => {
            return initialValue === "" ? undefined : value;
        })
        .positive()
        .min(18, "A valid age must be provided")
        .max(117)
        .required("An age is required")
        .when("gender", ([gender], schema) => {
            if (!Object.values(Gender).includes(gender)) return schema;
            const ageRule = MaxAgeRules[gender];
            return schema
                .min(ageRule.min, `Age must be a minimum of ${ageRule.min}`)
                .max(ageRule.max, `Max age for ${gender} is ${ageRule.max}`)
                .required("Age is required");
        })
        .required("A valid number is required"),

    // }).required("Age is required")
});

type UserFormType = Yup.InferType<typeof validationSchema>;

const Form = ({ title = "Create user", isOpen = false, initialValues = {}, onSave, onCancel }: FormProps) => {
    const form = useForm<UserFormType>({
        mode: "onBlur",
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });
    const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
        onSave?.(data);
    };

    return (
        <Modal title={title} open={isOpen} onClose={() => onCancel?.()}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6 flex-col w-full justify-between items-start">
                    <div className="overflow-y-auto h-[calc(100vh/1.5)]">
                        <div className="flex space-y-4 flex-col w-full">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="col-span-1">
                                    <Select
                                        name="gender"
                                        label="Gender"
                                        options={genderOptions}
                                        optionLabel="name"
                                        optionValue="value"
                                        placeholder="Required"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Input name="age" label="Age" type="number" min="0" />
                                </div>
                                <div className="col-span-1">
                                    <Input name="firstName" label="First Name" />
                                </div>
                                <div className="col-span-1">
                                    <Input name="lastName" label="Last Name" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 w-full flex flex-row justify-between items-center space-x-4">
                        <Button type="button" onPressed={() => onCancel?.()} className="rounded-xl !bg-white !text-black !border-neutral-300">
                            {"Cancel"}
                        </Button>
                        <Button className="!w-full flex-1 rounded-xl" type="submit">
                            {"Save"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
};

export default Form;
