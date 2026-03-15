"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/AuthModal";

export default function SignupPageClient() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {open && (
        <AuthModal
          mode="signup"
          onClose={() => {
            setOpen(false);
            router.push("/");
          }}
        />
      )}
    </div>
  );
}
