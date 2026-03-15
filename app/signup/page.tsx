import type { Metadata } from "next";
import SignupPageClient from "./SignupPageClient";

export const metadata: Metadata = {
  title: "Sign Up — parixai",
  description: "Join the parixai waitlist for early cloud access.",
};

export default function SignupPage() {
  return <SignupPageClient />;
}
