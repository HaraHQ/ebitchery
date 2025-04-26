"use client";

import { FishDetail, FishInfo } from "@/components/FishTank/fish";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";

import dynamic from "next/dynamic";

const FishTank = dynamic(() => import("@/components/FishTank"), { ssr: false })

export default function Home() {
  const [fishDetails, setFishDetails] = useState<FishDetail | null>(null);
  const [fishes] = useState<FishInfo[]>([
    {
      text: ["ahhhh", "yamete kudasaii", "ooohh"],
      fishSpeed: 70,
      details: {
        id: "0001",
        referral: null,
        name: "akiko",
        age: 17,
        tobrut: false,
        height: 170,
        weight: 50,
        race: "asia/japan",
        size: "24A",
      },
    },
    {
      text: ["yamete", "eung!!"],
      fishSpeed: 30,
      details: {
        id: "0002",
        referral: null,
        name: "miki",
        age: 18,
        tobrut: true,
        height: 155,
        weight: 60,
        race: "asia/japan",
        size: "36D",
      },
    },
    {
      text: ["kimochi", "senpai", "aishiteru yo"],
      fishSpeed: 10,
      details: {
        id: "0003",
        referral: null,
        name: "shizune",
        age: 17,
        tobrut: true,
        height: 162,
        weight: 60,
        race: "asia/japan",
        size: "35G",
      },
    },
  ]);

  const fishTank = useMemo(
    () => (
      <FishTank
        fishSpeed={50}
        fishes={fishes}
        onFishClick={(details) => {
          setFishDetails(details);
        }}
      />
    ),
    [fishes]
  );

  return (
    <div>
      <div className="w-[300px] mx-auto">
        <h1 className="text-5xl py-4 font-bold text-center">eBitchery</h1>
        <div className="flex flex-col gap-2">
          {fishTank}
          <div>
            <p className="font-semibold">
              Pimp: <span className="font-extralight">Ono-san</span>
            </p>
            <p className="font-semibold">
              Location: <span className="font-extralight">Tokyo, Japan</span>
            </p>
          </div>
        </div>
        <AnimatePresence>
          {fishDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center"
              onClick={() => setFishDetails(null)}
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="bg-white p-4 rounded-t-lg w-[300px] h-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="text-xl font-bold">Bitch Details</h1>
                <Image src={"/face_right.png"} width={268} height={153} alt={fishDetails.name} />
                <p>Name: {fishDetails.name} — {fishDetails.referral ? `${fishDetails.referral}_${fishDetails.id}` : fishDetails.id}</p>
                <p>Age: {fishDetails.age}</p>
                <p>Height: {fishDetails.height}cm</p>
                <p>Weight: {fishDetails.weight}kg</p>
                <br />
                <p>Race: {fishDetails.race}</p>
                <p>Size: {fishDetails.size}{fishDetails.tobrut ? <span className="font-semibold">{" — "}TOBRUT</span> : <span className="font-light">{" — "}TOCIL</span>}</p>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
