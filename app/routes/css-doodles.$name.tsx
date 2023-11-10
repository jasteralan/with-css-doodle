import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import clsx from "clsx";

import { readDoodle } from "~/utils/doodle.service";

import Doodle from "~/components/Doodle";

export async function loader({ params: { name } }) {
  return { doodle: await readDoodle(`${name}.txt`) };
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { doodle } = useLoaderData<typeof loader>();
  const [key, setKey] = useState(new Date().getTime());

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <button
        type="button"
        className={clsx(`
          absolute w-10 h-10 left-3 top-3 z-10
          rounded-full flex transition bg-white opacity-30
        `)}
        onClick={() => setKey(new Date().getTime())}
      >
        <RotateCcw className="m-auto text-zinc-800" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          className="w-full h-screen"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { type: "tween", ease: "easeOut", delay: 0.1 },
          }}
          exit={{ opacity: 0, transition: { type: "tween", ease: "easeIn" } }}
        >
          <Doodle rule={doodle} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
