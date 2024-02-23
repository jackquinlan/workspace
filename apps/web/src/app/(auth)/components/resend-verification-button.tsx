"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";

import { api } from "@workspace/api/react";
import { Button } from "@workspace/ui";

import { Loader } from "@/components/loading-animation";

interface Props {
    email: string;
}

export function ResendVerificationButton({ email }: Props) {
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();
    const resendVerification = api.user.sendVerificationEmail.useMutation({
        onSuccess: () => {
            toast.success("Verification email sent. Please check your email");
            router.push("/inbox");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    async function handleResendVerification() {
        startTransition(async () => {
            await resendVerification.mutateAsync({ email });
        });
    }
    return (
        <Button
            variant="outline"
            onClick={() => handleResendVerification()}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex items-center gap-1">
                    <RefreshCcw className="w-4 h-4" />
                    Resend verification email
                </div>
            )}
        </Button>
    );
}