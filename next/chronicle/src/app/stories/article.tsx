"use client"

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon, ThumbsUpIcon, Comment02Icon, BookmarkAdd02Icon, Share03Icon } from "@icons/index"

export default function Article() {
    return (
        <div className="flex flex-col gap-11 w-3/4 mx-auto">
            <div className="flex flex-col gap-5 pl-8 pr-8">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 tex">
                    Simplifying DevOps: Easy Practical Ansible Use Cases for Beginners
                </h2>
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <Badge>Java</Badge>
                        <Separator orientation="vertical" className="bg-zinc-500 h-6 w-[1.5px]" />
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7">
                                    <AvatarImage src="https://github.com/shadcn.png" className="w-7 h-7" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm text-zinc-500">Amin Haiqal</p>
                                    <p className="text-xs text-muted-foreground">Nov 25, 2024</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                    <Button variant="link" size="icon"><ThumbsUpIcon /></Button>
                                    <Button variant="link" size="icon"><Comment02Icon /></Button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-auto">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt="Photo by Drew Beamer"
                        fill
                        className="h-full w-full rounded-md object-cover"
                    />
                </AspectRatio>
                <p className="text-sm text-muted-foreground">Dall.E Generated Images. A visual representation of server infrastructure being automated with Ansible.</p>
            </div>
            <div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Ansible is a powerful open-source automation tool that can help you configure and manage your servers. It is a simple yet powerful tool that can help you automate your server infrastructure. In this article, we will explore some easy practical Ansible use cases for beginners.
                </p>
            </div>
            <div className="fixed bottom-4 right-7">
                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline" size="icon" className="border-zinc-500 hover:border-zinc-600 bg-zinc-950 w-8 h-8">
                            <MoreVerticalIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                        <div className="flex flex-col gap-2">
                            <Button variant="link" size="icon"><BookmarkAdd02Icon /></Button>
                            <Button variant="link" size="icon"><Share03Icon /></Button>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    )
}