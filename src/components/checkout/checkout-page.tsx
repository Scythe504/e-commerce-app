"use client"
import React, { useEffect, useState } from "react"
import {
    Card,
    CardContent
} from "../ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { getCartItems } from "@/actions/getItem";
import HashLoader from "react-spinners/HashLoader";
import { Item } from "@prisma/client";
import { PaymentForm } from "./checkout-form";

export const CheckoutPage = () => {
    const [cartItem, setCartItems] = useState<{
        title: string,
        price: number
    }[]>([]);
    const [sumTotal, setSumTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#1105f7");

    useEffect(() => {
        getCartItems().then((res) => {
            const data = (res.success);
            if (data) {
                let sum = 0;
                data[0].items.flatMap((item, idx) => {
                    setCartItems([{
                        title: item.title,
                        price: item.price
                    }])
                    sum += item.price
                })
                setSumTotal(sum);
            }
            setLoading(false)
        }).catch(e => console.error({ e }))
    }, [])

    return (<div className="md:px-20 px-2"> {
        loading
            ? <div className="h-screen flex items-center justify-center pb-20">
                <HashLoader
                    loading={loading}
                    color={color}
                    size={150}
                />
            </div>
            :
            <Card className="grid md:grid-cols-2 p-4 mt-3 rounded-lg ">
                <CardContent className="md:block hidden">
                    <Table>
                        <TableCaption>
                            Checkout For All your Cart Items
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">
                                    Items
                                </TableHead>
                                <TableHead>
                                    Qty
                                </TableHead>
                                <TableHead className="text-right">
                                    Amount(&#8377;)
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                cartItem.map((item) => (
                                    <TableRow>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell className="text-right">1</TableCell>
                                        <TableCell className="text-right">&#8377;{item.price}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    Total
                                </TableCell>
                                <TableCell className="text-right">
                                    &#8377;{sumTotal}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
                <CardContent className="lg:border-l border-zinc-400">
                    <PaymentForm>
                        {/* ----------------------Mobile------------------- */}
                        <Card className="p-2 mt-1 rounded-lg">
                            <CardContent>
                                <Table>
                                    <TableCaption>
                                        Checkout For All your Cart Items
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[300px]">
                                                Items
                                            </TableHead>
                                            <TableHead>
                                                Qty
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Amount(&#8377;)
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            cartItem.map((item) => (
                                                <TableRow>
                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell className="text-right">1</TableCell>
                                                    <TableCell className="text-right">&#8377;{item.price}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                Total
                                            </TableCell>
                                            <TableCell className="text-right">
                                                &#8377;{sumTotal}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        </Card>
                        {/* --------------------------- */}
                    </PaymentForm>
                </CardContent>
            </Card>
    }
    </div>)
}