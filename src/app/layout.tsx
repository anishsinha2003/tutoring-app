import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import styles from "@/styles/mainPage.module.css";
import { auth0 } from "@/lib/auth0";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const _ = await auth0.getSession();
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#D9D9D9" }}>
        <Auth0Provider>
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}
