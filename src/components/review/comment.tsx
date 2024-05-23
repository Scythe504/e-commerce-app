"use client"
import { useState } from "react";
import { Textarea } from "../ui/textarea"
import React from "react";
import { FaStar } from "react-icons/fa";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "../ui/button";
import { postReview } from "@/actions/review";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";

const StarRating = ({ setRating, ratingValue }: {
    setRating: React.Dispatch<React.SetStateAction<number>>
    ratingValue: number,
}) => {
    return (
        <div className="flex flex-row items-center w-full mx-6">
            {Array(5)
                .fill(0)
                .map((_, idx) => (
                    <label key={idx} className="w-full">
                        <input
                            type="radio"
                            name="rating"
                            onChange={() => setRating(idx)}
                            value={ratingValue}
                            checked={idx === ratingValue}
                            className="hidden"
                        />
                        <FaStar color={idx < ratingValue + 1 ? "#01af93" : "#bbb"} 
                            onChange={()=> setRating(idx)}
                            size={35}
                        />
                    </label>
                ))}
        </div>
    );
};

export const PostReview = ({ id }: {
    id: string
}) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { toast } = useToast();

    const onSubmit = async () => {
        const review = await postReview({
            itemId: id,
            content: comment,
            rating: rating + 1
        });
        if (review.error) {
            toast({
                description: review.error,
            })
        }

        if (review.success) {
            toast({
                description: review.success
            })
        }
    }

    return <div className="space-y-1 relative w-full">
        <div>
            <label>Overall Rating</label>
            <StarRating setRating={(val) => setRating(val)} ratingValue={rating} />
        </div>
        <div>
            <Label>Write your Review</Label>
            <Textarea
                placeholder="Write a detailed review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
        </div>
        <Button
            onClick={onSubmit}
            className="w-full"
        >
            Post Review
        </Button>
    </div>
}