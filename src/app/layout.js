import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/services/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Car-doctor",
    template:"%s | Car-doctor"},
  description: "Car Repairing workshop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="carDoctorTheme">
      <body className={inter.className}>
      <AuthProvider>
        <Navbar />
        {children}
        <Footer/>
        </AuthProvider>
        </body>
    </html>
  );
}
