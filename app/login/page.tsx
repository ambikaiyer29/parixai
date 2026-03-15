import type { Metadata } from "next";
import LoginPageClient from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Log In — parixai",
  description: "Log in to your parixai account.",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
