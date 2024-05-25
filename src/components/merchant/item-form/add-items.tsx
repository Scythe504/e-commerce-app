"use client"
import { publishProduct } from "@/actions/merchant";
import { FormError } from "@/components/results/error";
import { FormSuccess } from "@/components/results/success";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { itemDetailsSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadThing"
import { useToast } from "@/components/ui/use-toast";

const AddItems = () => {
    const [success, setSuccess] = useState<string | undefined>("");
    const { toast } = useToast();
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [imageKey, setImageKey] = useState("");
    const form = useForm<z.infer<typeof itemDetailsSchema>>({
        resolver: zodResolver(itemDetailsSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
        },
    })
    async function onSubmit(values: z.infer<typeof itemDetailsSchema>) {
        startTransition(() => {
            publishProduct(values, imageKey)
                .then(data => {
                    if (data.error) {
                        form.reset();
                        setError(data.error)
                    }
                    if (data.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                }).catch(e => {
                    form.reset();
                    console.error({ e });
                    setError("Something went wrong")
                })
        })
    }


    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 lg:mx-40 p-4  ">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Title of the Product"
                                type="text"
                                {...field}
                                disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="description of the product" {...field}
                                disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Price of the item"
                                {...field}
                                type="number"
                                disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex flex-col items-center justify-center gap-2 w-full">
                <div>
                    <UploadButton
                        endpoint={'imageUploader'}
                        onClientUploadComplete={(res) => {
                            res.forEach((r) => setImageKey(r.key));
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
                <Button
                    type="submit"
                    className=" w-36"
                    disabled={isPending}
                >
                    Submit
                </Button>
            </div>
        </form>
    </Form>
    )
}

export default AddItems;