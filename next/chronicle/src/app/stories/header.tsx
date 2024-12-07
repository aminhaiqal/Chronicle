"use client";

import { Button } from "@/components/ui/button";
import Notification01Icon from "@/assets/icons/notification-01-stroke-standard";
import Search01Icon from "@/assets/icons/search-01-stroke-standard";
import QuillWrite01Icon from "@/assets/icons/quill-write-01-stroke-standard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
    return (
        <div className="relative flex items-center h-14 bg-zinc-900">
            <div className="absolute left-4 flex items-center gap-2">
                <Button variant="outline" size="icon" className="border-zinc-500 hover:border-zinc-600 bg-zinc-950 w-8 h-8">
                    <Search01Icon />
                </Button>
                <h4 className="text-xl font-semibold tracking-tight text-white sm:hidden">
                    Chronicle
                </h4>
            </div>

            <h4 className="mx-auto text-xl font-semibold tracking-tight text-white hidden sm:block">
                Chronicle
            </h4>

            <div className="absolute right-4 flex gap-2 justify-center">
                <Button variant="outline" size="icon" className="border-zinc-500 hover:border-zinc-600 bg-zinc-950 w-8 h-8">
                    <QuillWrite01Icon />
                </Button>
                <Button variant="outline" size="icon" className="border-zinc-500 hover:border-zinc-600 bg-zinc-950 w-8 h-8">
                    <Notification01Icon />
                </Button>
                <Avatar className="w-8 h-8 ml-2">
                    <AvatarImage src="https://github.com/shadcn.png" className="w-8 h-8" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}
