import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import clsx from "clsx";
import {PrismicPreview} from "@prismicio/next";
import {createClient, repositoryName} from "@/prismicio";

const urbanist = Urbanist({subsets: ["latin"]});

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return {
        title: settings.data.meta_title,
        description: settings.data.meta_description,
        // openGraph: {
        //   images: [settings.data.og_image?.url || ""],
        // },
    };
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-slate-900 text-slate-100">
        <body className={clsx(urbanist.className, "absolute top-0 left-0 right-0 min-h-screen")}>
        <Header/>
        <main className='min-h-[600px]'>
            {children}
        </main>
        <Footer/>
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen"/>
        <Image
            priority
            src='/bg1.jpeg'
            quality={10}
            alt='bg'
            className="absolute pointer-events-none inset-0 -z-40 h-full opacity-1 mix-blend-soft-light"
            fill
            sizes="100vw"
            style={{
                objectFit: "cover"
            }}/>
        </body>
        <PrismicPreview repositoryName={repositoryName}/>
        </html>
    );
}
