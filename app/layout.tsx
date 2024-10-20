import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/app/Providers";

export const metadata = {
  title: "MobiiWrap",
  description:
    "Experience top-quality wrapping services for mobile phones, earphones, and more at Mobiiwrap. Discover customizable skins that add style, protection, and personality to your devices.",
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
              position: "bottom-right",
            }}
          />
          <main className="px-5 pb-5 mx-auto container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
