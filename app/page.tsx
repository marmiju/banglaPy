import Link from "next/link";
import BanglaCodeRunner from "./components/BanglaCodeRunner";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid max-w-[1280px] mx-auto  justify-center items-center  h-screen">
      <div className="text-center space-y-2" >
         <h1 className="text-4xl text-purple-700 ">বাংলাকোড</h1>
         <p className=" text-black border-b">প্রোগ্রামিং কঠিন নয়, শিশুরাও এখন করবে জয়</p>
         <p className="max-w-[600px]">আমরা তৈরি করেছি একটি বাংলা-প্যথন ল্যাঙ্গুয়েজ কনভার্টার, যা শিশুরা সহজে বাংলাতে ইনপুট দিয়ে প্যথনে কোড চালাতে পারবে। এই টুলটি প্রোগ্রামিং শেখার প্রক্রিয়াকে আরো সহজ, মজা এবং সাশ্রয়ী করে তোলে, যেখানে শিশুরা তাদের মাতৃভাষায় কোডিং শিখতে এবং সমস্যা সমাধান করতে পারে। আজই প্রোগ্রামিংয়ের জগতে তাদের প্রথম পদক্ষেপ নেওয়ার সময়!</p>
         <div className="space-x-4">
          <Link href={'/banglapy'} className="bg-purple-600 text-white px-4 py-2"> প্রাকটিস করুন</Link>
          <Link
  href="https://github.com/marmiju/banglaPy" 
  target="_blank" 
  rel="noopener noreferrer"
  className="bg-slate-200 text-purple-600 px-4 py-2"
>
  শিখুন
</Link>

         </div>
      </div>
    </main>
  );
}
