import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Twitch Clone",
  description: "Twitch Clone NextJS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.className} h-full antialiased`}
        >
        <body>
          <div className="flex justify-center items-center w-full h-full">
            <Suspense>
              {children}
            </Suspense>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
