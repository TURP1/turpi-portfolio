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

    const ogTitle = settings.data.meta_title || 'Creative Frontend Developer';
    const ogDescription = settings.data.meta_description || 'Passionate and skilled Creative Frontend Developer with expertise in Next.js, three.js, GSAP, and CRM. Experienced in creating engaging user interfaces and optimizing user experiences. Check out my portfolio to see my latest projects and accomplishments.';
    const ogLink = 'https://turpi-portfolio.vercel.app';
    const ogImage = settings.data.og_image?.url || "";
    const ogSite = 'Turpi-Portfolio';


    return {
        title: settings.data.meta_title,
        description: settings.data.meta_description,
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: ogLink,
            siteName: ogSite,
            images: [
                {
                    url: ogImage,
                    width: 800,
                    height: 600,
                },
                {
                    url: ogImage,
                    width: 1800,
                    height: 1600,
                    alt: 'My custom alt',
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            site: 'ogSite',
            creator: 'Turpi',
            title: ogTitle,
            description: ogDescription,
            images: ogImage,
        }
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
        <main>
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
