import React from 'react';
import * as z from 'zod'

export interface childrenProps {
    children : React.ReactNode
}

export const loginSchema = z.object({
    email: z.string().email(),
    password : z.string().min(6,{
        message : 'Password must be atleast 6 characters long'
    })
})