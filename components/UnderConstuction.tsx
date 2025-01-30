import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function UnderConstuction() {
  return (
    <div className="flex flex-col bg-white">
      <Image
        src="/images/under-construction.jpg"
        alt="Under Construction"
        width={800}
        height={400}
        quality={100}
        priority
        className="h-64 w-full object-cover"
      />

      <div className="flex flex-1 items-center justify-center space-y-4">
        <div className="mx-auto max-w-xl px-4 py-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Under Construction
          </h1>

          <p className="mt-4 text-gray-500">
            We are currently working on this page. Please check back later.
          </p>

          {/* <a
            href="#"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a> */}

          <Link href={"/dashboard"} >
            <Button className="my-8">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Go Back Dasboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
