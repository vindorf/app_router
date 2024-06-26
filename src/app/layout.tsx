import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthProvider";



const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Hack App",
  description: "Generated by HackFresse",
};

export default function RootLayout({
  children,
  
}: {
  children: React.ReactNode;
 
}) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} ligth`}>  
        <AuthProvider>
        <Header />
        {children}       
        <Footer />  
        </AuthProvider>
      </body>
    </html>
  );
}
