import React from "react";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Image from "next/image";
const Chloe = localFont({
  src: [
    {
      path: "../../fonts/Chloe-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

const Leaderboard = () => {
  const leaderboard = [
    { rank: "4th", name: "Vidhaan099", points: 70 },
    { rank: "5th", name: "Aditi119", points: 60 },
    { rank: "6th", name: "Shruti108", points: 50 },
    { rank: "7th", name: "Ayush111", points: 40 },
  ];

  return (
    <div
      className={`h-svh pt-16 pb-7  flex flex-col justify-between  items-center px-6`}
    >
      <Header />

      <div className="flex flex-col gap-1 w-full mt-4">
        <div
          className="w-2/3 self-center"
          style={{
            border: "1px solid",
            borderImageSource:
              "linear-gradient(90deg, rgba(182, 217, 228, 0.5) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(182, 217, 228, 0.5) 100%)",
            borderImageSlice: 1,
          }}
        />
        <h1
          className={`${Chloe.className} font-normal text-4xl text-jetblack-25 text-center `}
        >
          LEADERBOARD
        </h1>
        <div
          className="w-2/3 self-center"
          style={{
            border: "1px solid",
            borderImageSource:
              "linear-gradient(90deg, rgba(182, 217, 228, 0.5) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(182, 217, 228, 0.5) 100%)",
            borderImageSlice: 1,
          }}
        />
      </div>

      {/* medals */}
      <div className="flex flex-col w-full">
        <div className="relative flex justify-center">
          <Image
            src={"/images/1st.png"}
            alt="1st medal"
            width={120}
            height={120}
            priority={true}
          />

          <h3
            className={`${Chloe.className} absolute bottom-0 left-1/2 -translate-x-1/2 font-normal text-lg text-center text-jetblack-25`}
          >
            Ayushi101
          </h3>
        </div>

        <div className="flex items-center justify-between -mt-5">
          <div className="relative">
            <Image
              src={"/images/2nd.png"}
              alt="1st medal"
              width={120}
              height={120}
            />

            <h3
              className={`${Chloe.className} absolute bottom-0 left-1/2 -translate-x-1/2 font-normal text-lg text-center text-jetblack-25`}
            >
              Siya100
            </h3>
          </div>

          <div className="relative">
            <Image
              src={"/images/3rd.png"}
              alt="1st medal"
              width={120}
              height={120}
            />

            <h3
              className={`${Chloe.className} absolute bottom-0 left-1/2 -translate-x-1/2 font-normal text-lg text-center text-jetblack-25`}
            >
              Yash087
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-2 w-full h-[28vh] flex flex-col gap-y-1.5">
        {leaderboard?.map((user, index) => (
          <div
            key={index}
            className="flex flex-1 text-jetblack-25 justify-between items-center w-full font-medium text-base/4.5 px-5 py-3 rounded-lg outline-1 outline-blue-slate"
          >
            <span className="">{user.rank}</span>
            <span className=" ml-4 mr-auto">{user.name}</span>
            <span className="">Pts.{user.points}</span>
          </div>
        ))}
      </div>

      <button className="mt-2 w-full  bg-blue-slate  text-white font-bold text-lg/5.5  py-3 text-center rounded-lg outline-1 outline-white hover:bg-[#3a6176] transition">
        Download Your Certificate
      </button>
    </div>
  );
};

export default Leaderboard;
