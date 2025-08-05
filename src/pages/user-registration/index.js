import FloweryImage from "@/components/FloweryImage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, Check, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { languages } from "../../../constant";
import Link from "next/link";

// 3 index json
// ,
//                 {
//                     "image_url": null,
//                     "key": "option5",
//                     "text": "Acerola Cherry"
//                 }

export default function UserRegistration() {
  const [tab, setTab] = useState(1);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");

  const [animation, setAnimation] = useState(false);

  const [animationNumber, setAnimationNumber] = useState(0);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (name && animationNumber === 0) {
      setTimeout(() => {
        setAnimationNumber(1);
      }, 500);
    }
  }, [name]);

  useEffect(() => {
    if (tab === 2) {
      setTimeout(() => {
        setAnimationNumber(2);
      }, 500);
    }
  }, [tab]);

  useEffect(() => {
    const id = setTimeout(() => {
      setAnimation(true);
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="pt-16 pb-7 flex flex-col items-center h-svh">
      <Header />

      <div className="pt-7 pb-3 w-full h-full flex flex-col justify-between gap-3 items-center ">
        <div className="w-full flex flex-col gap-16 items-center">
          <FloweryImage
            className={`${
              animation ? "opacity-100 " : "opacity-0 "
            }       transition-all duration-500 ease-out transform`}
          />

          <div className="w-4/5">
            <h1
              className={`text-xl leading-5 font-bold  mb-4 text-center uppercase text-jetblack-25
              ${
                animation
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } 
              transition-all duration-500 ease-out transform
              `}
            >
              {tab === 1 ? "USER REGISTRATION" : "CHOOSE LANGUAGE"}
            </h1>

            {tab === 1 && (
              <div
                className={`w-full
              ${
                animation
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } 
              transition-all duration-500 ease-out transform
              `}
              >
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  value={name}
                  onChange={handleChange}
                  className="w-full p-4.5 text-base leading-5 uppercase font-semibold rounded-lg outline-1 outline-white text-center text-jetblack-25 placeholder:font-light"
                />

                <p
                  className={`text-center text-sm leading-4 mt-2 uppercase ${
                    name
                      ? "font-semibold flex items-center justify-center gap-2 opacity-100"
                      : "font-light "
                  } transition-all duration-1000 ease-in-out transform`}
                >
                  {name ? name.toUpperCase() : "UNIQUE ID"}
                  {name && (
                    <span>
                      <CircleCheck size={16} color="#06B300" strokeWidth={1} />
                    </span>
                  )}
                </p>
              </div>
            )}

            {tab === 2 && (
              <div
                className={`flex w-full flex-col items-center justify-center gap-3 text-base leading-5 font-semibold text-steel-navy ${
                  animationNumber === 2 ? "opacity-100" : "opacity-0"
                }
              transition-all duration-1000 ease-in-out transform
              `}
              >
                {languages.map((l) => {
                  return (
                    <button
                      key={l}
                      onClick={(e) => setLanguage(l)}
                      className="w-full py-4 px-6 flex items-center justify-between rounded-lg border border-white font-semibold text-left uppercase"
                    >
                      {l}
                      {language === l && (
                        <Check
                          size={20}
                          className="text-white bg-blue-slate rounded-full p-1"
                          strokeWidth={2}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {name && tab === 1 && (
          //   <Link href={"/select-language"}>
          <ArrowRight
            onClick={() => setTab(2)}
            size={64}
            strokeWidth={1}
            className={`border-1 border-jetblack-25 rounded-md p-3
              ${
                animationNumber > 0
                  ? "opacity-100 translate-y-0 "
                  : "opacity-0 translate-y-full"
              } transition-all duration-700 ease-out transform
              `}
          />

          //   </Link>
        )}

        {tab === 2 && (
          <Link
            href={language ? "/quiz" : "#"}
            className={`w-4/5 outline-1 outline-white rounded-lg  ${
              language
                ? "bg-blue-slate text-white"
                : "bg-pale-sky/70 text-steel-navy"
            }`}
          >
            <button
              className={"px-10 w-full py-3 font-bold text-lg leading-5.5"}
            >
              CONTINUE
            </button>
          </Link>
        )}
      </div>

      <Footer />
    </div>
  );
}
