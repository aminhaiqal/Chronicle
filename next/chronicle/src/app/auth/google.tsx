import GoogleIcon from "@/assets/icons/google-solid-sharp";
import { Button } from "@/components/ui/button";

export default function GoogleButton() {
    return (
        <Button variant="secondary" className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-10">
            <GoogleIcon className="mr-1" />
            Continue with Google
        </Button>
    )
}