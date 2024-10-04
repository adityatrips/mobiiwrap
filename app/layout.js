import { Montserrat } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { ProductProvider } from "@/context/ProductContext";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
	title: "Store",
	description: "A store for all your needs",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<CategoryProvider>
						<ProductProvider>
							<NextTopLoader color="#000" height={4} />
							<Header />
							<Toaster />
							{children}
							<Footer />
						</ProductProvider>
					</CategoryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
