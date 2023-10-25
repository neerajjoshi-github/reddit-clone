import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center px-4 text-center">
        <Image
          src="/images/reddit-notfound.svg"
          width={160}
          height={160}
          alt="Not Found"
        />
        <h2 className="text-4xl">Page Not Found!!</h2>
        <p>Sorry the page you are looking for does not exist!</p>

        <Button className="p-0 m-0">
          <Link href="/" className="px-6 py-2 font-semibold">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
