import {ShipWheelIcon} from "lucide-react";
import { useState } from "react";
import { Link} from "react-router";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { signup } from "../lib/api";

const SignupPage = () => {

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const queryClient = useQueryClient()
    
    const {mutate: signupMutation, isPending, error} = useMutation({
        mutationFn: signup,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    });
    
    const handleSignup = (e) => {
        e.preventDefault()
        signupMutation(signupData)
    }

    return (
        <div className="h-screen flex items-center justify-center p-4 zm:p-6 md:p-8" data-theme="forest">
            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

                {/* Signup Form LEFT Side */}
                <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
                {/* LOGO */}
                <div className="mb-4 flex items-center justify-start gap-2">
                    <ShipWheelIcon className="size-9 text-primary" />
                    <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                        VDOStream
                    </span>
                </div>

                {/* ERROR MESSAGE IF ANY ! */}
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error.response.data.message}</span>
                    </div>
                )}

                <div className="w-full">
                    <form onSubmit={handleSignup}>
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold">Create an Account</h2>
                                <p className="text-sm opacity-70">
                                    Join VDOStream and start your language learning adventure!
                                </p>
                            </div>

                            {/* NAME */}
                            <div className="space-y-3">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text"
                                        placeholder="Enter your name"
                                        className="input input-bordered w-full"
                                        value={signupData.fullName}
                                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* EMAIL */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"
                                        placeholder="Enter your mail"
                                        className="input input-bordered w-full"
                                        value={signupData.email}
                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                        required
                                    
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full"
                                        value={signupData.password}
                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                        required
                                    />
                                    <p>Password must be atleast 6 characters long!</p>
                                </div>

                                {/* TERMS AND CONDITIONS */}
                                <div className="form-control ">
                                    <label className="label cursor-pointer justify-start gap-2">
                                        <input type="checkbox" className="checkbox checkbox-sm" required />
                                        <span className="text-xs leading-tight">
                                            I agree to the{" "}
                                            <span className="text-primary hover:underline">terms of services</span> and{" "}
                                            <span className="text-primary hover:underline">privacy policy</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <button className="btn btn-primary w-full" type="submit">
                                {isPending ? (
                                    <>
                                    <span className="loading loading-spinner loading-xs">
                                        Loading...
                                    </span>
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            <div className="text-center mt-4">
                                <p className="text-sm">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-primary hover:underline">
                                    Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
                </div>

                {/* Signup Form RIGHT Side */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
                    <div className="max-w-md p-8">
                        {/* Illustration */}
                        <div className="relative aspect-square max-w-sm mx-auto">
                            <img src="/logoVDOStream.png" alt="Language connection illustration" className="w-full h-full" />
                        </div>

                        <div className="text-center space-y-3 mt-6">
                            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
                            <p className="opacity-70">
                                Practice conversations, make friends, and imporve your language skills together!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage