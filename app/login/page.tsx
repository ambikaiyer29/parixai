import type { Metadata } from "next";
import LoginPageClient from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Log In — parixai",
  description: "Log in to your parixai account.",
  alternates: {
    canonical: 'https://parixai.com/login',
  },
  openGraph: {
    title: 'Log In — parixai',
    description: 'Log in to your parixai account.',
    url: 'https://parixai.com/login',
    siteName: 'parixai',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Log In — parixai',
    description: 'Log in to your parixai account.',
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
