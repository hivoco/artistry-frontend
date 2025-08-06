import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, SquareArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [animation, setAnimation] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const id = setTimeout(() => {
      setAnimation(1);
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  const handleClick = () => {
    setTimeout(() => {
      router.push("/user-registration");
    }, 1000);
  };
  return (
    <div className="pt-16 pb-7 flex flex-col justify-between items-center h-svh max-w-md mx-auto">
      <Header
        className={`transition-transform duration-700 ease-out ${
          animation ? "scale-100" : "scale-0"
        }`}
      />

      <div
        className={`flex flex-col items-center gap-10  ${
          animation === 1
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-50"
        }
      transition-all duration-700 ease-out transform
      `}
      >
        <Image
          className="w-auto h-auto max-w-full max-h-full object-contain"
          src={"/group-creams.png"}
          alt="logo"
          width={375}
          height={357}
          priority={true}
        />

        {animation <= 2 && (
          // <Link href={"/user-registration"}>
          <ArrowRight
            onClick={() => {
              setAnimation(2);
              handleClick();
            }}
            size={64}
            strokeWidth={2}
            className="border-1 border-black rounded-md p-3"
          />
          // </Link>
        )}
      </div>

      <Footer
        className={`${
          animation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-40"
        }
      transition-all duration-700 ease-out transform
      `}
      />
    </div>
  );
};

export default Home;
