"use client"
import { getPurchases } from "@/actions/purchase"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter
} from "../ui/table"
import { Item, Purchase } from "@prisma/client"
import Link from "next/link"
import { formatDate } from "@/utils/date-format"
import ClipLoader from "react-spinners/ClipLoader"

interface Purchases extends Purchase {
    items: Item[]
}

export const PurchaseList = () => {
    const [purchase, setPurchase] = useState<Purchases>({
        id: 0,
        userId: "",
        purchasedAt: new Date(),
        items: [{
            id: "",
            title: "",
            description: "",
            image: "",
            price: 0
        },]
    })
    const [loading, setLoading] = useState(true)
    const { toast } = useToast();
    useEffect(() => {
        getPurchases().then((data) => {
            if (data.success) {
                setPurchase(data.success)
            }
            if (data.error) {
                toast({
                    description: data.error
                })
            }
            setLoading(false)
        })
    }, [])



    return (<>{
        loading
            ? <div className="w-screen pb-20 h-screen flex items-center justify-center">
                <ClipLoader
                    loading={loading}
                    color="#0000ff"
                    size={100}
                />
            </div>
            :
            <div className="lg:px-48 px-4">

                <Table className="">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>item_id</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-left">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purchase.items.map((item) => (
                            <TableRow key={purchase.id}>
                                <TableCell className="font-medium">{`INV${purchase.id}`}</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Card</TableCell>
                                <TableCell>
                                    <Link
                                        href={`/item/${item.id}`}
                                        target="_blank"
                                    >
                                        <span className="w-[10px] text-left underline">
                                            {item.id}
                                        </span>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-left">{formatDate(purchase.purchasedAt)}</TableCell>
                                <TableCell className="text-left">{item.price}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table >
            </div>
    }
    </>
    )
}