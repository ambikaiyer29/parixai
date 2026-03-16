import type { Metadata } from "next";
import SignupPageClient from "./SignupPageClient";

export const metadata: Metadata = {
  title: "Sign Up — parixai",
  description: "Join the parixai waitlist for early cloud access.",
  alternates: {
    canonical: 'https://parixai.com/signup',
  },
  openGraph: {
    title: 'Sign Up — parixai',
    description: 'Join the parixai waitlist for early cloud access.',
    url: 'https://parixai.com/signup',
    siteName: 'parixai',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sign Up — parixai',
    description: 'Join the parixai waitlist for early cloud access.',
  },
};

export default function SignupPage() {
  return <SignupPageClient />;
}
