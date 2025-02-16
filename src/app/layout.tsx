import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
  adjustFontFallback: false,
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Resto Cafe",
  description: "Resto Cafe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans antialiased`}>
      <body>
        <Providers>
          <div>{children}</div>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
