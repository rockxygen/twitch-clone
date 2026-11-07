import { auth } from '@clerk/nextjs';
import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { existsSync } from "node:fs";

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  let hasSentinel = false;

  try {
    hasSentinel = existsSync(".maintenance");
  } catch {}

    if (isMaintenance || hasSentinel) {
      // Allow the maintenance page itself.
      if (req.nextUrl.pathname.startsWith("/maintenance")) {
        return NextResponse.next();
      }
      const url = req.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.rewrite(url);
    }

  // ----- Clerk authentication guard ----------------------------------------
  const pathname = req.nextUrl.pathname;
  if (
    pathname === "/"
  ) {
    const { isAuthenticated, redirectToSignIn } = await auth();
    if (!isAuthenticated) return redirectToSignIn();
  }

});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)', // Run middleware on API routes
    '/__clerk/(.*)', // Run middleware on Clerk frontend API routes
  ],
}

// proxy.ts – combines Clerk authentication, maintenance‑mode handling
// and automatic fallback to maintenance when the database cannot be reached.
// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse, NextRequest } from "next/server";

// export default clerkMiddleware(async (auth, req: NextRequest) => {
//   // ----- Maintenance guard ---------------------------------------------------
// //   const isMaintenance = process.env.MAINTENANCE_MODE === "true";
// //   let hasSentinel = false;
// //   try {
// //     // `fs` may be unavailable in edge runtime.
// //     const { existsSync } = require("node:fs");
// //     hasSentinel = existsSync(".maintenance");
// //   } catch {}

//   // ----- Database health guard -----------------------------------------------
// //   let dbDown = false;
// //   const prisma = new PrismaClient();
// //   try {
// //     await prisma.$connect();
// //   } catch {
// //     dbDown = true;
// //   } finally {
// //     await prisma.$disconnect();
// //   }

// //   if (isMaintenance || hasSentinel || dbDown) {
// //     // Allow the maintenance page itself.
// //     if (req.nextUrl.pathname.startsWith("/maintenance")) {
// //       return NextResponse.next();
// //     }
// //     const url = req.nextUrl.clone();
// //     url.pathname = "/maintenance";
// //     return NextResponse.rewrite(url);
// //   }

//   // ----- Clerk authentication guard ----------------------------------------
//   const pathname = req.nextUrl.pathname;
//   if (
//     pathname === "/"
//   ) {
//     const { isAuthenticated, redirectToSignIn } = await auth();
//     if (!isAuthenticated) return redirectToSignIn();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and static assets unless they appear in query params.
//     "/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Clerk auto‑proxy path
//     "/__clerk/:path*",
//     // API / tRPC routes
//     "/(api|trpc)(.*)",
//   ],
// };
