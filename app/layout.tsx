import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./providers";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ProchainMoi - Envoyez un message à votre futur vous",
  description: "Écrivez un message que vous recevrez dans le futur. Simple et sécurisé.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased ${quicksand.className}`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
