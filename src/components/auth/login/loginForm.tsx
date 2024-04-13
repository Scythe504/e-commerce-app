"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/utils/types"

function onSubmit(){
    console.log("Submitted")
}

export default function LoginForm() {
  // ...
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password : ""
    },
  })
 


  return ( <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex items-center space-x-8">
        <hr className="flex-grow border-gray-400"/>
        <span className="text-gray-400">Or</span>
        <hr className="flex-grow border-gray-400"/>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
        type="submit"
        className="w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
