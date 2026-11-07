import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Suspense } from "react";

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
          <ClerkProvider>
          <div className="flex justify-end items-center p-4 gap-4 h-16">
            <Suspense>
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </Suspense>
          </div>
          <Show when="signed-in">
          {children}
          </Show>
        </ClerkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
