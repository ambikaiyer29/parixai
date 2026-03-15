"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/AuthModal";

export default function LoginPageClient() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {open && (
        <AuthModal
          mode="login"
          onClose={() => {
            setOpen(false);
            // Navigate home after closing
            router.push("/");
          }}
        />
      )}
    </div>
  );
}
