import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "../types/schema"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { LoginResponse } from "../types/types"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"


export function LoginForm() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { checkAuth } = useAuth();
    const navigate = useNavigate();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const loginMutation = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await axios.post<LoginResponse>(
                `${backendUrl}/api/auth/login`,
                data,
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: async () => {
            await checkAuth();
            toast.success('Login successful');
            navigate('/');
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Login failed");
        }
    })

    const guestLoginMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post<LoginResponse>(
                `${backendUrl}/api/auth/guest-login`,
                {},
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: async () => {
            await checkAuth();
            toast.success('Logged in as guest');
            navigate('/');
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Guest login failed");
        }
    })

    function onSubmit(data: LoginFormData) {
        loginMutation.mutate(data)
    }

    const handleGuestLogin = () => {
        guestLoginMutation.mutate()
    }

    return (
        <div className="mx-auto my-auto">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center font-bold text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="xyz@example.com" {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4 w-full">
                                <Button
                                    type="submit"
                                    className="w-full cursor-pointer bg-blue-800 hover:bg-blue-950"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? "Logging in..." : "Login"}
                                </Button>

                                <div className="mt-1 text-center text-sm text-muted-foreground">
                                    Don't have an account?{" "}
                                    <Button
                                        variant="link"
                                        className="text-blue-600 hover:text-blue-800 p-0 cursor-pointer"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register here
                                    </Button>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-muted-foreground">
                                            or
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="w-full cursor-pointer text-blue-1000 bg-blue-100"
                                    onClick={handleGuestLogin}
                                    disabled={guestLoginMutation.isPending}
                                >
                                    {guestLoginMutation.isPending ? "Logging in as guest..." : "Continue as Guest"}
                                </Button>

                                <div className="text-sm text-muted-foreground w-full flex flex-col justify-center">
                                    <p>Guest login allows you to review the app's core features:</p>
                                    <ul className="list-none mx-auto mt-1">
                                        <li className="before:content-['•'] before:mr-2">See the events</li>
                                        <li className="before:content-['•'] before:mr-2">Filter events</li>
                                        <li className="before:content-['•'] before:mr-2">Search events</li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}