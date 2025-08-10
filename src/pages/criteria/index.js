import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Criteria = () => {
  const [passed, setPassed] = useState(false);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sessionID, setSessionID] = useState("");
  const [userID, setUserID] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const { correctAnsNum, name, session_id } = router.query;
      const result = Number(correctAnsNum) * 10;
      setPercent(result);
      setPassed(result >= 60 ? true : false);
      setLoading(false);
      setUserID(name || "");
      setSessionID(session_id || "");
    }
  }, [router.isReady]);

  if (loading) {
    return null;
  }
  return (
    <div className={`relative w-full h-svh max-w-md mx-auto pt-16 pb-11  `}>
      <Image
        className="w-full h-auto absolute top-0 left-0 right-0 pointer-events-none"
        src={"/images/top-image-quiz.png"}
        width={375}
        height={140}
        alt="top-image background flowery"
        priority={true}
      />

      <div className="relative z-10 w-[85%] flex flex-col justify-between items-center full h-full max-w-md mx-auto">
        <Header />

        <div className="flex flex-col gap-6 items-center relative w-full">
          <Image
            //   className="w-full h-auto absolute top-0 left-0 right-0 pointer-events-none"
            src={passed ? "/images/tick.png" : "/images/cross.png"}
            width={70}
            height={70}
            alt={passed ? "right" : "wrong"}
            priority={true}
          />
          <h2 className="font-bold text-4xl/10 text-steel-navy  ">
            You scored {percent}%
          </h2>
          {passed && (
            <>
              <Image
                className="absolute left-0 w-full h-full object-cover"
                src={"/gifs/confetti.gif"}
                width={375}
                height={100}
                alt={"confetti"}
                priority={true}
              />

              <Image
                className="absolute right-0 w-full h-full object-cover rotate-180"
                src={"/gifs/confetti.gif"}
                width={375}
                height={100}
                alt={"confetti"}
                priority={true}
              />
            </>
          )}
        </div>

        <div className="flex flex-col gap-3.5 items-center ">
          <h2 className="font-semibold text-[28px]/8 text-steel-navy  ">
            {passed ? "Congratulations!!" : "Oops!!"}
          </h2>

          <p
            className={`font-normal text-base/5 text-steel-navy text-center
            ${passed ? "" : "w-2/3"}
            `}
          >
            {passed
              ? "You passed, You are eligible for your Achievement Certificate."
              : `Almost there, You didn’t meet the passing criteria this time. Would you like to try again?`}
          </p>
        </div>

        {passed ? (
          <div className="w-full flex flex-col gap-2.5 items-center">
            <p className="font-normal text-xs/4 text-steel-navy text-center">
              *View the leaderboard to download your certificate.{" "}
            </p>

            <Link
              className="w-full"
              href={`/leaderboard?&name=${userID}`}
            >
              <button className=" w-full  bg-blue-slate  text-white font-bold text-lg/5.5  py-3 text-center rounded-lg outline-1 outline-white hover:bg-[#3a6176] transition">
                View Leaderboard{" "}
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => router.back()}
              className="px-10 w-full  py-3 bg-[#C0DDE9]/70 border border-white rounded-lg text-steel-navy font-bold text-lg "
            >
              Yes
            </button>

            <Link className="w-full" href={"/"}>
              <button className="px-10 w-full py-3 bg-[#C0DDE9]/70 border border-white rounded-lg text-steel-navy font-bold text-lg ">
                No
              </button>
            </Link>
          </div>
        )}
      </div>

      <Image
        className="w-full h-auto absolute bottom-0 left-0 right-0 pointer-events-none"
        src={"/images/bottom-image-quiz.png"}
        width={375}
        height={150}
        alt="bottom-image background flowery"
        priority={true}
      />
    </div>
  );
};

export default Criteria;
