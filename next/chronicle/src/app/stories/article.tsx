"use client"

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function Article() {
    return (
        <div className="flex flex-col gap-12 w-3/4 mx-auto">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 tex pl-8 pr-8">
                Simplifying DevOps: Easy Practical Ansible Use Cases for Beginners
            </h2>
            <div className="w-auto">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt="Photo by Drew Beamer"
                        fill
                        className="h-full w-full rounded-md object-cover"
                    />
                </AspectRatio>
            </div>
        </div>
    )
}