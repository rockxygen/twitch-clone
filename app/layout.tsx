import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Suspense } from "react";
import "./globals.css";
import { dark } from "@clerk/themes";

import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Twitch Clone",
  description: "Twitch Clone NextJS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html
        lang="en"
        className={`${inter.className} h-full antialiased`}
        >
        <body className="flex justify-center items-center w-full min-h-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense>
                {children}
            </Suspense>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
