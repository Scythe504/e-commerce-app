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


const AddItems = ()=>{
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof itemDetailsSchema>>({
        resolver: zodResolver(itemDetailsSchema),
        defaultValues: {
          title : "",
          description : "",
          price : ""
        },
      })
      async function onSubmit (values : z.infer<typeof itemDetailsSchema>) {
        
        startTransition(()=>{
            publishProduct(values)
            .then(data=>{
                if(data.error) {
                    form.reset();
                    setError(data.error)
                }
                if(data.success) {
                    form.reset();
                    setSuccess(data.success);
                }
            }).catch(e=>{
                form.reset();
                console.error({e});
                setError("Something went wrong")
            })
        })
    }
    
    
    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-8">
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
                            <Input 
                            placeholder="description of the product" {...field} 
                            type="text"
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
                            {...field } 
                            type="number" 
                            disabled={isPending}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                Submit
            </Button>
        </form>
    </Form>
    )
}

export default AddItems;