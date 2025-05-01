import ReactQueryProvider from "@/lib/react-query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "킹받는 밸런스 게임 - 너라면 뭘 고를래?",
        template: "킹받는 밸런스 게임 | %s",
    },
    description:
        "고르기 싫은 두 선택지, 당신의 선택은? 직접 질문도 만들고 친구들에게 킹받게 해보세요!",
    icons: {
        icon: "/favicon.icon",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen bg-gradient-to-br from-[#a58fff] to-[#ffa77f] mx-10`}
            >
                <ReactQueryProvider>
                    {" "}
                    <main>{children}</main>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
