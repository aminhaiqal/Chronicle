"use client";

import { Header } from "./header";
import { NotiBanner } from "./noti-banner";
import Story from "./story";
import withAuth from "@/utils/withAuth";

function Stories() {
    return (
        <div className="min-h-screen bg-zinc-800">
            <div className="flex flex-col">
                <Header />
                <NotiBanner />
                <div className="mt-4">
                    <Story />
                </div>
            </div>
        </div>
    );
}

export default withAuth(Stories);