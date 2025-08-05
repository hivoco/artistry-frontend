import FloweryImage from "@/components/FloweryImage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, Check, CheckCircle, CircleCheck } from "lucide-react";
import Link from "next/link";

export default function SelectLanguage() {
  return (
    <div className="pt-16 pb-7 flex flex-col items-center h-svh">
      <Header />

      <div className="pt-7 pb-3 w-full h-full flex flex-col justify-between gap-3 items-center ">
        <div className="w-full flex flex-col gap-16 items-center">
          <FloweryImage />

          <div className="w-4/5 text-jetblack-25 ">
            <h1 className="text-xl font-bold  mb-4 text-center uppercase">
              Choose Language
            </h1>

            <div className="flex w-full flex-col items-center justify-center gap-3 text-base font-semibold text-jetblack-25 ">
              <button className="w-full py-4 px-6 rounded-lg border border-jetblack-25 text-left">
                ENGLISH
              </button>

              <button className="w-full py-4 px-6  rounded-lg border  border-jetblack-25 font-semibold text-left">
                HINDI
                <Check
                  size={20}
                  className="text-white bg-blue-slate rounded-full p-1"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>

        <button className="px-10 w-4/5 py-3 bg-[#C0DDE9]/70 border border-white rounded-lg text-blue-slate font-bold text-lg ">
          CONTINUE
        </button>
      </div>

      <Footer />
    </div>
  );
}
