import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/lib/UserContext";
import { CartProvider } from "@/lib/cartProvider";
import { LocationProvider } from "@/lib/LocationContext";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trialshopy",
  description: "Founder Nikhil Chaudhary",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <LocationProvider>
          <UserProvider>
            <CartProvider>{children}</CartProvider>
          </UserProvider>
          </LocationProvider>
        </Suspense>
        <Toaster />
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}
