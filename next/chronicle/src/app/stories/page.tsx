import { Header } from "./header";
import { NotiBanner } from "./noti-banner";
import Story from "./story";

export default function Stories() {
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