"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
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
import { useTransition, useState } from "react"
import { login, register } from "@/actions/authentication"
import { FormSuccess } from "@/components/results/success"
import { FormError } from "@/components/results/error"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")
  const [isMethodLogin, setMethodLogin] = useState<boolean>(true)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      if (isMethodLogin) {
        try {
          const data = await login(values);
          if (data.error) setError(data.error)
          setSuccess(data.success);
        } catch (error) {
          console.error({ error })
        }

      }
      if (!isMethodLogin) {
        try {
          const data = await register(values);
          if (data.error) setError(data.error);
          setSuccess(data.success);
        } catch (error) {
          console.error({ error })
        }
      }
    })

  }
  
  if(isMethodLogin) {
    console.log("Login Now")
  } else {
    console.log("Register Now")
  }



  return (<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex items-center space-x-8">
        <hr className="flex-grow border-gray-400" />
        <span className="text-gray-400">Or</span>
        <hr className="flex-grow border-gray-400" />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="example@example.com"
                {...field}
                disabled={isPending} />
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
              <Input
                placeholder="******"
                {...field}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormSuccess message={success} />
      <FormError message={error} />
      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        Submit
      </Button>


    </form>
    {isMethodLogin &&
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-row items-center justify-center">
        <p>Don&apos;t have an account?</p>
        <Button
          variant={"link"}
          disabled={isPending}
          onClick={() =>
            setMethodLogin(() => !isMethodLogin)
          }
          className="-ml-3"
        >Register Now
        </Button>
      </motion.div>
    }
    {
      !isMethodLogin &&
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-row items-center justify-center"
      >
        <p>Already have an account?</p>
        <Button
          variant={"link"}
          disabled={isPending}
          onClick={() =>
            setMethodLogin(() => !isMethodLogin)
          }
          className="-ml-3"
        >Login
        </Button>
      </motion.div>
    }
  </Form>
  )
}
