"use client"
import { useCallback, useRef, useState } from "react"
import { UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "./ui/input"

export function DocumentUploadDrawer() {
    const [file, setFile] = useState<File | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null)

    const onSubmit = useCallback(() => {
        if (!file) return;
        const formData = new FormData()
        formData.append('file', file);
        fetch('/api/chat', {
            method: 'PUT',
            body: formData,
        }).then(e => {
            btnRef.current?.click();
            setFile(null)
        })
    }, [setFile, file])

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button ref={btnRef} variant="outline"><UploadIcon /> Upload Document</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Choose a PDF Document</DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2 h-[120px]">
                            <Input
                                type="file"
                                onChange={(e) => setFile(e.target.files?.item(0) || null)}
                            />
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={() => onSubmit()}>Upload</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
