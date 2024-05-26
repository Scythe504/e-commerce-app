import React from 'react';
import * as z from 'zod'

export interface childrenProps {
    children: React.ReactNode
}

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password must be atleast 6 characters long'
    })
})

export const itemDetailsSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.string().refine((val) => !Number.isNaN(parseInt(val))),
})

export const reviewSchema = z.object({
    id: z.string(),
    rating: z.number().max(5, {
        message: 'Rating cannot exceed 5*'
    }),
    content: z.string(),
})

export const paymentSchema = z.object({
    CardHolderName: z.string().min(1, {
        message: "Name Cannot Be Empty"
    }),
    email: z.string().email(),
    cardNumber: z.string().max(16,{
        message : "Please enter a valid Card Number"
    }).refine((val) => !Number.isNaN(parseInt(val))),
    cvvNumber: z.string().max(4, {
        message: "Please enter a valid CVV"
    }).refine((val)=> !Number.isNaN(parseInt(val))),
    BillingCity: z.string(),
    BillingPostalCode: z.string().max(6, {
        message: "Please enter a valid Postal Code"
    }).refine((val) => !Number.isNaN(parseInt(val))),
    HomeAddress: z.string(),
    couponCode: z.string(),
})