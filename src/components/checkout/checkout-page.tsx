"use client"
import React, { useEffect, useTransition, useState } from "react"
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
import CircleLoader from "react-spinners/HashLoader";
import { Item } from "@prisma/client";
import { PaymentForm } from "./checkout-form";
import { addToCart } from "@/actions/add-to-cart";
import { addPurchase } from "@/actions/purchase";
import { useToast } from "../ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader";

export const CheckoutPage = () => {
    const [cartItem, setCartItems] = useState<Item[]>([]);
    const [isPending, startTransition] = useTransition();
    const [sumTotal, setSumTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#1105f7");
    const { toast } = useToast();

    useEffect(() => {
        getCartItems().then((res) => {
            const data = (res.success);
            if (data) {
                let sum = 0;
                data.items.map((item) => {
                    setCartItems((prevItem) => [
                        ...prevItem
                        , {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            price: item.price,
                            image: item.image
                        }])
                    sum += item.price
                })
                setSumTotal(sum);
            }
            setLoading(false)
        }).catch(e => console.error({ e }))
    }, [])

    const handleSubmit = () => {
        startTransition(async () => {
            try {
                const id_arr = cartItem.map(item => item.id)
                if (id_arr.length === 0) {
                    toast({
                        description: "No items being Bought"
                    })
                    throw new Error("No items Being Bought")
                }
                const data = await addPurchase({
                    itemIds: id_arr
                });
                if (data.success) {
                    toast({
                        description: data.success
                    })
                }
            } catch (error) {
                toast({
                    description: "Some Error Occurred"
                })
            }
        })
    }

    return (<div className="md:px-20 px-2"> {
        loading
            ? <div className="h-screen flex items-center justify-center pb-20">
                <ClipLoader
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
                                    <TableRow key={item.id}>
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
                    <PaymentForm isPending={isPending} handleSubmit={handleSubmit}>
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
                                                <TableRow key={item.id}>
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