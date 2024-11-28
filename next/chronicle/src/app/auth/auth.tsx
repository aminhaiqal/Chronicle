"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export function AuthForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { handleAuth } = useAuth();
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            await handleAuth(values.email, values.password);
        } catch (error) {
            console.error("Authentication error:", error);
            form.setError("email", { message: "Unable to authorize." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} id={field.name} placeholder="Email" className="bg-zinc-800 p-4" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} id={field.name} type="password" placeholder="Password" className="bg-zinc-800 p-4" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormDescription className="text-center pb-2">
                    By signing up, you agree to our <a href="#" style={{ textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
                </FormDescription>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" /> Authorizing...
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </Button>

            </form>
        </Form>
    )
}