import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/app/Providers";
import { brandName } from "./constants";
import Footer from "@/components/ui/Footer";
import NavigationMenu from "@/shared/NavigationMenu";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"antialiased dark bg-background text-foreground"}>
        <Providers>
          <Toaster />
          <NavigationMenu />
          <div className="mb-10 w-full">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
