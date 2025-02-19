import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from '../context/CartContext';
import { InteractionsProvider } from '../context/InteractionsContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Influencer Grid",
  description: "A platform for managing influencer content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <InteractionsProvider>
            {children}
          </InteractionsProvider>
        </CartProvider>
      </body>
    </html>
  );
} 