"use client";

import { FormResponse } from "@/lib/interface/form-response.interface";
import { Button } from "@/components/ui/button";

import { useState } from "react";


import { Drawer } from "vaul";
import FormEditShift from "./form-update-shift";
import { Shift } from "./table/columns";

export default function EditShiftModal(
    { data }: { data: any }
) {
    const [response, setResponse] = useState<FormResponse>();
    const [isOpen, setIsOpen] = useState(false);

    
    return (
        <div className="grid grid-cols-1">
            <Drawer.Root
                direction="right"
                // modal={false}
                // dismissible={false}
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <Drawer.Trigger asChild>
                    <Button aria-haspopup variant={"ghost"}>Edit</Button>
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
                                    Edit Shift Daily
                                </Drawer.Title>

                                <FormEditShift setIsOpen={setIsOpen} data={data} />
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
}
