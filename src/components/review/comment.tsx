"use client"
import { useState } from "react";
import { Textarea } from "../ui/textarea"

export const PostReview = ({ id }: {
    id: string
}) => {
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);
    
    return <Textarea
        placeholder="Post a review"
    />
}