"use client";
import { Rss } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { UploadButton } from "@/utils/uploadThing";
import { ControllerRenderProps } from "react-hook-form";
export const UploadImageButton = ({control} : {
    control : any
}) => {
    const { toast } = useToast();

    return <div>
        <UploadButton
            endpoint={'imageUploader'}
            onClientUploadComplete={(res) => {
                control.onChange(res.flatMap(item=> item.key))
                toast({
                    description: "File has been uploaded",
                })
            }}
            onUploadError={(error: Error) => {
                console.error({ error })
                toast({
                    description: "Some error occurred, failed to upload File"
                })
            }}
        >
        </UploadButton>
    </div>
}