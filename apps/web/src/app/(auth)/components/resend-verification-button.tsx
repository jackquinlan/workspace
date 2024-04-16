"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

import { api } from "@workspace/api/react";
import { Button, LoadingDots } from "@workspace/ui";

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
    <Button variant="outline" onClick={() => handleResendVerification()} disabled={isLoading}>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="flex items-center gap-1">
          <RefreshCcw className="h-4 w-4" />
          Resend verification email
        </div>
      )}
    </Button>
  );
}
