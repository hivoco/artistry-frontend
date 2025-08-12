import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Image from "next/image";
import { BASE_URL } from "../../../constant";
import { useRouter } from "next/router";
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
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [leaderboardList, setLeaderboardList] = useState([]);

  const getInfo = async (sessionID, name) => {
    setIsLoading(true);
    fetch(BASE_URL + `/get_top5?session_id=${sessionID}&name=${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Return the promise for the next then
      })
      .then((data) => {
        console.log("Success:", data);

        setIsLoading(false);
        setLeaderboardList(data?.top_5);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        // setIsRoomExists(null); // Reset on error
      });
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { name, session } = router.query;

    if (!session && !name) {
      router.replace("/");
      return;
    }

    getInfo(session || "", name);
  }, [router.isReady]);

  if (isLoading) {
    return null;
    // return <h1>Loading ...</h1>;
  }

  return (
    <div
      className={`h-svh sm:min-h-svh sm:h-full pt-16 pb-7  flex flex-col justify-between  items-center px-6 max-w-md mx-auto`}
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
      <div className="flex flex-col  w-full mt-2">
        <div className="relative flex flex-col items-center ">
          <Image
            className="w-27.5"
            src={"/images/1st.png"}
            alt="1st medal"
            width={130}
            height={130}
            priority={true}
          />

          <h3 className={`${Chloe.className} font-normal text-lg text-center `}>
            {leaderboardList[0]?.name || "null"}
          </h3>
        </div>

        <div className="flex items-center justify-between -mt-1 px-5">
          <div className="relative">
            <Image
              className="w-22.5"
              src={"/images/2nd.png"}
              alt="1st medal"
              width={130}
              height={130}
            />

            <h3
              className={`${Chloe.className} font-normal text-lg text-center`}
            >
              {leaderboardList[1]?.name || "null"}
            </h3>
          </div>

          <div className="relative ">
            <Image
              className="w-21"
              src={"/images/3rd.png"}
              alt="1st medal"
              width={130}
              height={130}
            />

            <h3
              className={`${Chloe.className}  font-normal text-lg text-center`}
            >
              {leaderboardList[2]?.name || "null"}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-2 w-full h-[28vh] flex flex-col gap-y-1.5">
        {leaderboardList.slice(3)?.map((user, index) => (
          <div
            key={index}
            className="flex  text-[#111111] justify-between items-center w-full font-medium text-base/4.5 px-5 py-3 sm:py-2 rounded-lg outline-1 outline-blue-slate"
          >
            <span className="">{user?.rank}</span>
            <span className=" ml-4 mr-auto">{user?.name}</span>
            <span className="">Pts.{user?.score}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => window.open("/pdf/user-certificate.pdf", "_blank")}
        className="mt-2 w-full  bg-blue-slate  text-white font-bold text-lg/5.5  py-3 text-center rounded-lg outline-1 outline-white hover:bg-[#3a6176] transition"
      >
        Download Your Certificate
      </button>
    </div>
  );
};

export default Leaderboard;
