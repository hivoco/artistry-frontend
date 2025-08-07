import FullScreenImageDisplay from "@/components/FullScreenImageDisplay";
import ProgressBar from "@/components/ProgressBar";

import {
  ArrowLeft,
  Check,
  Fullscreen,
  LogOut,
  Maximize,
  Mic,
  Volume2,
  VolumeOff,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../constant";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Timer from "@/components/Timer";

const Quiz = () => {
  const [quizData, setQuizData] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionSelected, setOptionSelected] = useState(null);
  const [userResponseArray, setUserResponseArray] = useState([]);

  const [animation, setAnimation] = useState(false);
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("");
  const [userID, setUserID] = useState("");
  const [seconds, setSeconds] = useState(30);
  const searchParams = useSearchParams();
  const [sessionID, setSessionID] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const lang = searchParams.get("lang");
      const session_id = searchParams.get("session") || "";
      setLanguage(lang);
      setSessionID(session_id);
    }
  }, [router]);

  useEffect(() => {
    async function getQuizData() {
      try {
        const response = await fetch(
          BASE_URL + "/api/get_all_question?lang=" + language
        );
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        setQuizData(data?.quiz);
      } catch (err) {
        console.log(err);
      }
    }

    if (language) {
      getQuizData();
    }
  }, [language]);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 1000);
  }, []);

  const verifyAnswer = async ({
    lang,
    is_write,
    onClick,
    platform,
    question_id,
    user_answer,
  }) => {
    if (
      !quizData[currentQuestionIndex] ||
      currentQuestionIndex + 1 > quizData.length
    )
      return;
    if (seconds === 2) return;

    try {
      const response = await fetch(BASE_URL + "/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang,
          is_write,
          onClick,
          platform,
          question_id,
          user_answer,
        }),
      });

      if (!response.ok) throw new Error("request failed");
      const data = await response.json();
      setResult(data);

      setUserResponseArray((prevArray) => [
        ...prevArray,
        {
          question: quizData?.[currentQuestionIndex]?.question,
          givenAns: data?.user_answer,
          correctAns: data.correct_option_value,
          isCorrect: data.is_correct,
          time: Math.floor(Math.random() * (30 - 3 + 1)) + 3,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [displayFullScreenImg, setDisplayFullScreenImg] = useState(false);

  const toggleImage = () => {
    setDisplayFullScreenImg(!displayFullScreenImg);
  };

  useEffect(() => {
    const id = sessionStorage.getItem("userID");
    if (id) {
      setUserID(id);
    } else {
      router.replace("/user-registration");
    }
  }, []);

  const completeQuiz = () => {
    // setIsQuizCompleted(true);
    // if (audio) audio.pause();
    insertRecord();
  };

  const handleSkip = () => {
    if (quizData.length === currentQuestionIndex + 1) return;
    if (currentQuestionIndex === 9) return;

    if (currentQuestionIndex < quizData.length - 1) {
      setOptionSelected(null);
      setSeconds(30);
      // resetState();
      // setIsPlaying(false);
      goToNextQuestion();
    }
  };

  // console.log(161, currentQuestionIndex);

  const goToNextQuestion = () => {
    if (quizData.length === currentQuestionIndex) return;

    if (currentQuestionIndex < quizData.length - 1) {
      console.log("no this called");

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("completeQuiz called by go to next");
      completeQuiz();
    }
  };

  const handleSubmit = () => {
    if (quizData.length === currentQuestionIndex) return;

    if (optionSelected) {
      // if (audio) {
      //   audio.pause();
      // }
      setOptionSelected(null);

      setSeconds(30);
      goToNextQuestion();
    }
  };

  const insertRecord = async () => {
    try {
      // setIsLoading(true);
      // const name = sessionStorage.getItem("name");
      const response = await fetch(BASE_URL + "/api/insert_record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userID,
          session_id: sessionID,
          quiz: userResponseArray,
        }),
      });

      await response.json();

      setTimeout(() => {
        router.push(`/leaderboard?session_id=${sessionID}&name=${userID}`);
      }, 150);
    } catch (error) {
      // setIsLoading(false);
      console.error("Error inserting record:", error);
      setTimeout(() => {
        router.push("/leaderboard");
      }, 150);
    }
  };

  return (
    <div
      // style={{
      //   height:
      //     quizData[currentQuestionIndex]?.question_id === 8 ? "100%" : "100svh",
      // }}
      className={`relative w-full h-svh  max-w-md mx-auto ${
        quizData[currentQuestionIndex]?.question_id === 8
          ? "sm:h-full"
          : "h-svh"
      } `}
    >
      <Image
        className="w-full h-auto absolute top-0 left-0 right-0 pointer-events-none"
        src={"/images/top-image-quiz.png"}
        width={375}
        height={140}
        alt="top-image background flowery"
        priority={true}
      />

      {/* main */}
      <div className="relative z-10 w-[85%] h-full flex flex-col justify-between mx-auto pt-[5vh] pb-[7vh]">
        <div
          className={`flex flex-col gap6 gap-2
           ${
             animation
               ? "opacity-100 translate-y-0"
               : "opacity-0 -translate-y-10"
           }
                 transition-all duration-700 ease-out transform
`}
        >
          <nav className="w-full flex items-center justify-between ">
            <div className="flex gap-3 items-center ">
              <Link className="cursor-pointer" href={"/user-registration"}>
                <ArrowLeft size={24} className="p-1" />
              </Link>

              <span className="text-dark-green font-semibold textlg/5.5 text-sm tracking-wide ">
                {/* {currentQuestionIndex + 1}/{questions.length} */}
                {/* 9/10 */}
              </span>
            </div>

            <div
              className={`flex  gap2.5  items-center
              transition-all duration-1000 ease-in-out
               ${
                 ""
                 // animation ? "translate-x-0 " : "translate-x-30"
               }
            `}
            >
              <Link className="" href={"/"}>
                <LogOut
                  className="text-blue-slate p-1.5 rounded-full bg-white border-1 border-blue-slate"
                  // size={34}
                  size={28}
                />
              </Link>

              <span
                onClick={() => setIsPlaying((prev) => !prev)}
                className=" rounded-full bg-white border-1 border-blue-slate"
              >
                {/* {!isPlaying ? (
                  <VolumeOff
                    className="text-blue-slate p-2"
                    //  size={34}
                    size={28}
                  />
                ) : (
                  <Volume2
                    className="text-blue-slate p-2"
                    // size={34}
                    size={28}
                  />
                )} */}
              </span>
            </div>
          </nav>

          <ProgressBar count={currentQuestionIndex + 1} animation={false} />
        </div>

        <div
          className={`mt-[5vh] sm:mt-[4vh] w-full flex gap-3 relative  outline-1 outline-white rounded-lg py7 py-6 sm:py-5 px-3 font-medium text-sm textbase/5 text-steel-navy
           ${quizData[currentQuestionIndex]?.is_large ? "flex-col" : ""}
          ${animation ? "opacity-100 " : "opacity-0 "}
          transition-all duration-700 ease-in-out transform
          `}
        >
          <span className="absolute left-1/2 -translate-x-1/2  top-0 -translate-y-1/2 bg-pale-sky outline-1 outline-white shadow-[0px_3.2px_3.2px_0px_#0000001F] rounded-full text-[11px] leading-[11px] font-semibold text-center size-8.5 p-1 flex items-center justify-center">
            {/* 00:30 */}
            <Timer
              onTimeout={handleSkip}
              seconds={seconds}
              setSeconds={setSeconds}
              index={currentQuestionIndex}
              isQuizQuestionLoading={!quizData.length}
              autoSubmit={handleSubmit}
            />
          </span>
          Q{currentQuestionIndex + 1}.{" "}
          {quizData.length > 0 && quizData[currentQuestionIndex]?.question}
          {/* Q1. I just use soap. Why do I need a cleanser? */}
          {quizData[currentQuestionIndex]?.question_img && (
            <div
              className={`relative h-auto ${
                quizData[currentQuestionIndex]?.is_large
                  ? "w-full "
                  : "rounded-lg max-w-full max-h-full"
              }`}
            >
              <Image
                className={`w-auto h-auto pointer-events-none  rounded-lg
                  ${quizData[currentQuestionIndex]?.is_large ? "" : ""}
                  `}
                src={quizData[currentQuestionIndex]?.question_img}
                width={375}
                height={150}
                alt="question image"
                priority={true}
              />
              <Maximize
                onClick={toggleImage}
                size={20}
                className="absolute right-1 top-1 p-1 text-white bg-black/40 rounded-[4px]"
              />
            </div>
          )}
        </div>
        {/* 
        <div
          onClick={() => setIsUserSpeaking((prev) => !prev)}
          className={`flex flex-col items-center pt-4 pb-1 sm:p-1 ${
            isUserSpeaking ? "" : "gap-1"
          }
          ${animation ? "opacity-100 " : "opacity-0 "}
          transition-all duration-700 ease-in-out transform
          `}
        >
          <Image
            src={isUserSpeaking ? "/gifs/waves.gif" : "/svgs/mic.svg"}
            className={`w-auto ${isUserSpeaking ? "h-35 -mt-8" : "h-[6.5vh]"}`}
            alt={isUserSpeaking ? "wave" : "mic"}
            width={40}
            height={56}
            priority={true}
          />

          <p
            className={`font-medium text-sm/3.5 ${
              isUserSpeaking ? "-mt-8" : ""
            }`}
          >
            {isUserSpeaking ? "Listening" : "Tap to answer"}
          </p>
        </div> */}

        <div
          className={`flex flex-col gap-y-2 w-full 
          ${animation ? "opacity-100 " : "opacity-0 "}
          transition-all duration-700 ease-in-out transform
          `}
        >
          <div className="flex items-center gap-2 justify-between w-full">
            {quizData[currentQuestionIndex]?.options.map((img, index) => {
              if (img?.image_url) {
                return (
                  <div
                    onClick={() => {
                      verifyAnswer({
                        lang: language,
                        is_write: false,
                        onClick: true,
                        platform: "",
                        question_id:
                          quizData[currentQuestionIndex]?.question_id,
                        user_answer: img?.text,
                      });
                      setOptionSelected(img?.text);
                    }}
                    className="relative w-full rounded-lg outline-1 outline-jetblack-25"
                    key={index}
                  >
                    <Image
                      src={img?.image_url}
                      className={`w-full h-full object-cover aspect-[1/1]`}
                      alt="icon"
                      width={130}
                      height={130}
                    />
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(140, 140, 140, 0) 45.19%, #252525 88.94%)",
                      }}
                    />
                    <p className="absolute left-3 bottom-2 whitespace-nowrap text-sm/4 font-normal text-white capitalize">
                      {img?.text}
                    </p>

                    {img?.text?.toLowerCase() ===
                      result?.correct_option_value?.toLowerCase() && (
                      <Check
                        size={16}
                        className="text-white bg-blue-slate rounded-full p-1"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                );
              }
            })}
          </div>

          {quizData[currentQuestionIndex]?.options.map((opt, index) => {
            if (opt?.image_url) return;
            return (
              <div
                key={index}
                onClick={(e) => {
                  setOptionSelected(opt?.text);
                  verifyAnswer({
                    lang: language,
                    is_write: false,
                    onClick: true,
                    platform: "",
                    question_id: quizData[currentQuestionIndex]?.question_id,
                    user_answer: opt?.text,
                  });
                }}
                className={`outline-1 outline-white  overflow-x-auto rounded-lg py5 py-3 px-2.5 text-steel-navy flex items-center justify-between text-xs textsm/4 font-medium
                  ${optionSelected === opt.text ? " bg-[#83BDC180]" : ""}
                  ${result ? "pointer-events-none" : "pointer-events-auto"}
              ${
                animation
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }
              transition-all duration-700 ease-out transform
                `}
              >
                {opt.text}
                {Number(result?.correct_option_key) === index + 1 && (
                  <Check
                    size={16}
                    className="text-white bg-blue-slate rounded-full p-1"
                    strokeWidth={2}
                  />
                )}

                {result &&
                  optionSelected?.toLocaleLowerCase() ===
                    opt?.text?.toLocaleLowerCase() &&
                  Number(result?.correct_option_key) !== index + 1 && (
                    <X
                      className="text-white bg-red-600 rounded-full p-1"
                      size={16}
                      strokeWidth={2}
                    />
                  )}
              </div>
            );
          })}
        </div>

        <div
          className={`flex w-full justify-between gap-5 mt-3
        ${animation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          transition-all duration-700 ease-out transform
          `}
        >
          <button
            onClick={() => {
              if (currentQuestionIndex === 9) return;
              setResult(null);
              handleSkip();
            }}
            className={
              "capitalize flex-1 text-center py-3 outline-1 outline-white rounded-lg font-semibold text-xl/6 bg-pale-sky/70 text-steel-navy "
            }
          >
            skip
          </button>

          <button
            onClick={() => {
              // if (currentQuestionIndex === 9) return;
              setOptionSelected(null);
              setResult(null);
              handleSubmit();
            }}
            className={
              "capitalize flex-1 text-center py-3 outline-1 outline-white rounded-lg font-semibold text-xl/6 bg-pale-sky/70 text-steel-navy "
            }
          >
            submit
          </button>
        </div>
      </div>

      {/* out of documnet flow  */}
      <Image
        className="w-full h-auto absolute bottom-0 left-0 right-0 pointer-events-none"
        src={"/images/bottom-image-quiz.png"}
        width={375}
        height={150}
        alt="bottom-image background flowery"
        priority={true}
      />

      {displayFullScreenImg && (
        <FullScreenImageDisplay
          toggleImage={toggleImage}
          src={quizData[currentQuestionIndex]?.question_img}
        />
      )}
    </div>
  );
};

export default Quiz;
