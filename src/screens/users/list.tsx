import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Engine from "@src/lib/engine";
import { User } from "@src/types";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Alert } from "@src/components";
import Form from "./form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import _ from "lodash";
import { Toaster, toast } from "sonner";

const userEngine = new Engine<User>("users");

const EmptyScreen = () => {
    return (
        <div className="w-full h-[60vh] space-y-2 bg-white flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold tracking-tight">Your team is missing a few players!</h2>
            <p className="text-gray-500">List your squad to join the league.</p>
        </div>
    );
};

const LoadingScreen = () => {
    return (
        <div className="w-full h-[80vh] space-y-2 bg-white flex flex-col justify-center items-center">
            <p className="text-gray-500">Checking your numbers...</p>
        </div>
    );
};

const ErrorScreen = () => {
    return (
        <div className="w-full h-[80vh] space-y-2 bg-white flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold tracking-tight">Something has gone wrong!</h2>
            <p className="text-gray-500">We're not usually like this, but give me a moment to catch my breath.</p>
        </div>
    );
};

function Sreen() {
    const [formOpened, setFormOpened] = useState(false);
    const [formValues, setFormValues] = useState<object | null | undefined>();
    const [modalTitle, setModalTitle] = useState<string>("");
    const [formMode, setFormMode] = useState<"create" | "update">("create");

    const [deleteQueue, setDeleteQueue] = useState<User | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    // Query for fetching the list page data
    const { data, isError, isLoading, isRefetching, isFetched, refetch } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => userEngine.list({ params: { _order: "desc" } }),
    });

    // Mutations for creating a user
    const createUser = useMutation<User>({
        mutationFn: ({ data }: { data: User }) => {
            return userEngine.create({ data });
        },
        onSuccess: async () => {
            closeModal();
            // Flash success message
            toast.success("User successfully created")
            
        },
        onError: async () => {
            closeModal();
            toast.error("User could not be created");
        },
        onSettled: async () => {
            await refetch();
        }
    });

    // Mutation for updating a user
    const updateUser = useMutation<User>({
        mutationFn: ({ id, data }: { id: string; data: User }) => {
            console.log("inside mutate", id, data);
            return userEngine.update({ id, data });
        },
        onSuccess: async () => {
            closeModal();
            // Flash success message
            toast.success("User successfully updated");
        },
        onError: async () => {
            closeModal();
            toast.error("User could not be updated");
        },
        onSettled: async () => {
            await refetch();
        },
    });

    const deleteUser = useMutation<User>({
        mutationFn: ({ id }: { id: string }) => {
            return userEngine.delete({ id });
        },
        onSuccess: async () => {
            // Flash success message
            toast.success("User successfully deleted");
        },
        onError: async () => {
            toast.error("User could not be deleted");
        },
        onSettled: async () => {
            closeModal();
            await refetch();
        },
    });

    const openModal = (values: object | null | undefined, mode: "create" | "update" = "create", title = "Create User") => {
        setFormValues(values);
        setModalTitle(title);
        setFormMode(mode);
        setFormOpened(true);
    };

    const closeModal = () => {
        setFormValues(null);
        setDeleteQueue(null);
        setShowAlert(false);
        setFormOpened(false);
    };

    const queryClient = useQueryClient(); // will use this to fetch records manually for update and delete

    const openCreateModal = () => {
        openModal({}, "create", "Create user");
    };

    const openUpdateModal = async (id: string) => {
        try {
            const user = await queryClient.fetchQuery<User>({ queryKey: ["users", id], queryFn: () => userEngine.fetch({ id }) });
            openModal(user, "update", "Update user");
        } catch (error) {
            alert("An unknown error occured..");
        }
    };

    const openDeleteAlert = (obj: User) => {
        setDeleteQueue(obj);
        setShowAlert(true);
    };

    if (isLoading) return <LoadingScreen />;
    if (isError) return <ErrorScreen />;

    return (
        <>
            <Toaster richColors />
            <div className="list-view space-y-4">
                <div className="flex justify-between items-center py-4 sticky top-0 bg-[var(--background-color)]">
                    <h1 className="headline">Users</h1>
                    <div className="flex justify-end items-center">
                        <Button className="flex justify-center items-center space-x-2" onPressed={() => openCreateModal()}>
                            <PlusIcon strokeWidth={3} className="h-5 w-5" />
                            <span>Add user</span>
                        </Button>
                    </div>
                </div>
                {data?.length > 0 ? (
                    <div className="w-full p-6 rounded-xl bg-white">
                        <table className="w-full border-collapse divide-y divide-neutral-100">
                            <thead>
                                <tr>
                                    <th>Gender</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Age</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {data?.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td className="gender">{_.capitalize(user.gender)}</td>
                                            <td className="name">{user.firstName}</td>
                                            <td className="name">{user.lastName}</td>
                                            <td className="age">{user.age}</td>
                                            <td className="actions">
                                                <div className="flex w-full flex-row justify-end items-center space-x-2">
                                                    <Button
                                                        onPressed={() => openUpdateModal(user.id)}
                                                        className="rounded-lg !text-xs px-2 py-1.5 border-neutral-300 text-black bg-white"
                                                    >
                                                        {"Edit"}
                                                    </Button>
                                                    <Button
                                                        onPressed={() => openDeleteAlert(user)}
                                                        className="rounded-lg !text-xs px-2 py-1.5 border-transparent text-black bg-white"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyScreen />
                )}
            </div>
            {Boolean(formValues) && formMode === "create" && (
                <Form
                    isOpen={formOpened}
                    initialValues={formValues}
                    onSave={(data) => createUser.mutate({ data })}
                    onCancel={() => closeModal()}
                    title={modalTitle}
                />
            )}
            {Boolean(formValues) && formMode === "update" && (
                <Form
                    isOpen={formOpened}
                    initialValues={formValues}
                    onSave={(data) => {
                        const { id } = data;
                        updateUser.mutate({ id, data });
                    }}
                    onCancel={() => closeModal()}
                    title={modalTitle}
                />
            )}
            {showAlert && deleteQueue && (
                <Alert
                    title="Delete user"
                    isOpen={showAlert}
                    obj={deleteQueue}
                    message={"Are you sure you want to delete this user?"}
                    onConfirm={(obj) => deleteUser.mutate({ id: obj.id })}
                    onCancel={() => closeModal()}
                />
            )}
        </>
    );
}

export default Sreen;
