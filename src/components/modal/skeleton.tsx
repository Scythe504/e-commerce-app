import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Modal = ({ 
    children,
    isFocus
 }: {
    children: React.ReactNode;
    isFocus : boolean
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(true);
    useClickOutside(ref, ()=>{
        setIsFocused(false);
    })
    
    return (isFocused && <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative flex items-center w-full"
    ref = {ref}
    onFocus={()=> setIsFocused(true)}
    >
        {children}
    </motion.div>)
}