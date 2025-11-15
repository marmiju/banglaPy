import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import FooterSec from "./components/footer/FooterSec";
import UserProvider from "./components/hooks/provider/ContextApi";
import MouseMove from "./components/Ui/MouseMove";


const tiro_Bangla = Tiro_Bangla({
  weight: "400"
});


export const metadata: Metadata = {
  title: "বাংলা-পাই | banglaPy",
  description: "BanglaPy শিশু ও শিক্ষানবীশদের জন্য তৈরি একটি বাংলা প্রোগ্রামিং শেখার প্ল্যাটফর্ম। যারা ইংরেজি জানে না, তারাও সহজে বাংলায় কোড শিখতে পারবে। অভিভাবকরাও এটি ব্যবহার করে তাদের সন্তানকে কোড শেখাতে পারবেন। | BanglaPy is a simple and fun platform designed to teach programming in Bangla. It’s perfect for children and beginners who don’t know English and for parents who want to teach coding to their kids in their own language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tiro_Bangla.className} antialiased  `}
      >

        <MouseMove/>
        <UserProvider >
          <Header />
          {children}
          <FooterSec />
        </UserProvider>
      </body>
    </html>
  );
}
