"use client"
import { useTransition } from "react"
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "@/utils/types";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { DatePickerDemo } from "../date-picker/date";
import visa from "../../../public/visa.svg"
import mastercard from "../../../public/mastercard.svg"
import Image from "next/image"
import { Button } from "../ui/button";

export const PaymentForm = ({ 
    children,
    handleSubmit,
    isPending
 }: {
    children : React.ReactNode,
    handleSubmit : ()=> void,
    isPending : any
}) => {

    const form = useForm<z.infer<typeof paymentSchema>>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            email: "",
            CardHolderName: "",
            cardNumber: "",
            cvvNumber: "",
            BillingCity: "",
            BillingPostalCode: "",
            HomeAddress: "",
            couponCode: ""
        },
    })

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <h1 className="text-3xl font-semibold text-center">
                Enter Details
            </h1>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="example@example.com"
                            {...field}
                            disabled={isPending}
                        />
                    </FormItem>
                )}
            />
            <FormLabel>CardDetails</FormLabel>
            <div className="border border-zinc-300 border-r-8 rounded-xl p-2 grid gird-rows-2 grid-cols-2 gap-2 px-3">
                <FormField
                    control={form.control}
                    name="CardHolderName"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Card Holders Name</FormLabel>
                            <Input
                                placeholder="Your Full Name"
                                {...field}
                                disabled={isPending}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <div className="flex flex-row w-full">
                                <FormLabel>Card Number</FormLabel>
                                <div className="flex flex-row items-end ml-auto">
                                    <Image
                                        src={visa}
                                        alt="visa"
                                        height={40}
                                        width={40}
                                    />
                                    <Image
                                        src={mastercard}
                                        alt="mastercard"
                                        height={40}
                                        width={40}
                                    />
                                </div>
                            </div>
                            <Input
                                placeholder="Your Card Number"
                                {...field}
                            />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col justify-center col-span-1 mt-2">
                    <FormLabel>Expiry Date</FormLabel>
                    <div>
                        <DatePickerDemo />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="cvvNumber"
                    render={({ field }) => (
                        <FormItem className="col-span-1 flex flex-col justify-center">
                            <FormLabel>CVV</FormLabel>
                            <Input
                                placeholder="CVV"
                                {...field}
                            />
                        </FormItem>
                    )}
                />
            </div>
            <FormLabel>Billing Address</FormLabel>
            <div className="border border-zinc-300 border-r-8 rounded-xl p-2 grid gird-rows-2 grid-cols-2 gap-3 px-3">
                <FormField
                    control={form.control}
                    name="BillingCity"
                    render={({ field }) => (
                        <FormItem className="col-span-1 flex flex-col justify-center">
                            <FormLabel>City</FormLabel>
                            <Input
                                placeholder="City"
                                {...field}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="BillingPostalCode"
                    render={({ field }) => (
                        <FormItem className="col-span-1 flex flex-col justify-center">
                            <FormLabel>POSTAL CODE</FormLabel>
                            <Input
                                placeholder="110011"
                                {...field}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="HomeAddress"
                    render={({ field }) => (
                        <FormItem className="col-span-2 flex flex-col justify-center">
                            <FormLabel>Address</FormLabel>
                            <Input
                                placeholder="Your Full Address"
                                {...field}
                            />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="couponCode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Coupon Code <span className="text-zinc-500">(PUT &apos;FREE100&apos;)</span></FormLabel>
                        <Input
                            placeholder="FREE100"
                            {...field}
                        />
                    </FormItem>
                )}
            />
            <div className="lg:hidden md:hidden">
                {children}
            </div>
            <Button
                className="w-full"
                variant={"default"}
                type="submit"
            >
                Pay Now
            </Button>
        </form>
    </Form>
}