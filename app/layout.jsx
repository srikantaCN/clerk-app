import "./globals.css";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  RedirectToOrganizationProfile,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { light } from "@clerk/themes";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clerk App",
  description: "Example Clerk App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: light,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {/* <SignedIn>
            <RedirectToOrganizationProfile />
          </SignedIn>
          <SignedOut>Please Sign In</SignedOut> */}
          <main className="container mx-auto">
            <div className="flex items-start  min-h-screen min-w-screen">
              <div className="mt-5">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
