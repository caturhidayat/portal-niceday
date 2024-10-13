"use client";

import { FormResponse } from "@/lib/interface/form-response.interface";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import createBranch from "./action";
import { Drawer } from "vaul";
import { useFormState } from "react-dom";

const initialState = {
    error: "",
    data: {},
};

export default function CreateBranchModal() {
    const [response, setResponse] = useState<FormResponse>();
    // const [state, formAction] = useFormState(createBranch, initialState);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="grid grid-cols-1">
            <Drawer.Root
                direction="right"
                dismissible={false}
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <Drawer.Trigger asChild>
                    <Button aria-haspopup>Create</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/30" />
                    <Drawer.Content
                        className="right-0 top-0 bottom-0 fixed z-10 flex outline-none"
                        role="dialog"
                        aria-modal="true"
                        aria-describedby="create-branch-description"
                    >
                        <div className="bg-background rounded-[16px] w-[380px] grow mt-2 mr-2 mb-2 p-5 flex flex-col">
                            <div className="">
                                <Drawer.Title className="font-bold mb-2">
                                    Create Branch
                                </Drawer.Title>

                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = new FormData(
                                            e.target as HTMLFormElement
                                        );
                                        const res = await createBranch(
                                            formData
                                        );
                                        console.log("response", res);

                                        setIsOpen(false);
                                    }}
                                    // action={formAction}
                                >
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Enter Branch Name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="location">
                                                Location
                                            </Label>
                                            <Input
                                                id="location"
                                                name="location"
                                                type="text"
                                                placeholder="Enter Branch Location"
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <Button
                                                onClick={() => setIsOpen(false)}
                                                className="mr-2"
                                                variant="outline"
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit">Save</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
}
