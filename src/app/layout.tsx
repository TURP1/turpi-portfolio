import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import clsx from "clsx";

const urbanist = Urbanist({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-slate-900 text-slate-100">
        <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Header/>
        {children}
        <Footer/>
        <Image src='/bg1.jpeg'
               quality={10}
               alt='bg'
               layout="fill"
               objectFit="cover"
               className="absolute pointer-events-none inset-0 -z-40 h-full opacity-1 mix-blend-soft-light"/>

        {/*<div*/}
        {/*    className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/bg1.jpeg')] opacity-1 mix-blend-soft-light "></div>*/}

        </body>
        </html>
    );
}
