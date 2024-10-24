import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/app/Providers";
import { brandName } from "./constants";

export const metadata = {
  title: brandName,
  description: `Experience top-quality wrapping services for mobile phones, earphones, and more at ${brandName}. Discover customizable skins that add style, protection, and personality to your devices.`,
  authors: [
    {
      name: "Aditya Tripathi",
      url: "https://www.linkedin.com/in/aditya-tripathi-at04/",
    },
    {
      name: "Ayush Verma",
      url: "https://www.linkedin.com/in/ayush-verma-/",
    },
  ],
  favicon: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"antialiased dark bg-background text-foreground"}>
        <Providers>
          <Toaster
            toastOptions={{
              className: "bg-background text-foreground",
              position: "bottom-left",
            }}
          />
          <main className="px-2 pb-5 mx-auto container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
