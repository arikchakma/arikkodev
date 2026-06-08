import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { sound } from "../lib/sound";

const LEFT_FOLDED =
  "M393.948 570.909C379.854 544.657 351.015 484.573 348.413 454.244C345.16 416.332 359.977 390.509 433.702 387.212C507.427 383.915 523.689 418.897 519.353 478.786L513.935 599.998";
const LEFT_UP =
  "M345.995 520.082C326.495 448.416 286.595 284.382 282.995 201.582C278.495 98.0823 298.995 27.5823 400.995 18.5823C502.995 9.58233 525.495 105.082 519.495 268.582L512 599.498";

const RIGHT_FOLDED =
  "M693.63 586.574C693.63 586.574 719.981 563.157 735.023 533.453C754.113 495.756 729.496 459.498 715.239 447.774C671.356 411.684 625.148 412.61 604.5 420.348C592.494 424.548 569.5 448.034 547.5 515.562L527 601.998";
const RIGHT_UP =
  "M722.995 590.582C764.995 480.082 784.118 425.391 807.995 368.582C863.495 212.582 891.419 199.468 882.995 137.082C866.995 18.5825 734.995 47.0822 695.995 74.0822C656.995 101.082 625.495 131.082 580.995 327.082L525 605.498";

const PALM =
  "M435.496 1005.09C397.495 943.589 412.996 841.089 495.996 789.089M601.496 767.089C560.996 783.589 458.696 803.389 373.496 750.589C266.996 684.589 311.495 586.589 373.496 588.589C435.496 590.589 452.022 623.363 590.496 592.585C653.496 578.582 843.496 573.586 849.496 789.089C854.911 983.582 609.495 1150.59 373.496 1113.59C184.696 1083.99 118.496 946.589 108.996 881.589";

const KNUCKLES =
  "M218.495 831.08C204.662 855.746 162.195 897.68 102.995 868.08C28.9951 831.08 22.4952 772.08 18.4952 716.58C14.4952 661.08 33.9954 580.081 102.995 562.58C136.662 554.04 164.328 572.246 173.495 580.08M412.995 772.582C411.329 801.248 391.995 858.182 327.995 856.582C247.995 854.582 186.495 838.578 165.495 716.58C144.495 594.581 194.995 513.081 277.995 506.081C344.395 500.481 386.329 559.081 398.995 589.081";

const HEART =
  "M134.995 398.082C100.995 365.082 53.372 332.22 70.372 379.22C81.372 411.22 124.372 442.22 160.372 452.22C176.372 414.22 193.372 366.22 171.372 339.22C161.372 327.22 143.995 388.082 134.995 398.082Z";

const SHAKE = [0, -2.6, 2, -1.4, 0.9, -0.4, 0];

type VictoryHandProps = {};

export function VictoryHand(props: VictoryHandProps) {
  const reduce = useReducedMotion();
  const [folded, setFolded] = useState(false);

  const DELAY = 0.05;
  const DURATION = 0.4;

  const unfurl = (delay: number) => ({
    type: "spring" as const,
    bounce: 0.4,
    duration: DURATION,
    delay,
  });

  const fold = {
    type: "spring" as const,
    bounce: 0,
    duration: DURATION * 0.8,
  };

  return (
    <motion.svg
      width="903"
      height="1137"
      viewBox="0 0 903 1137"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "auto", height: "32px", overflow: "visible" }}
      aria-label="A fist opening into a victory sign"
      role="img"
      onHoverStart={() => {
        if (reduce) return;
        setFolded(true);
        sound.handFold();
      }}
      onHoverEnd={() => {
        setFolded(false);
        if (!reduce) sound.handUnfurl();
      }}
    >
      <motion.g
        style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
        animate={
          reduce
            ? { scale: 1, rotate: 0 }
            : { scale: folded ? [1, 0.86, 1] : 1, rotate: folded ? SHAKE : 0 }
        }
        transition={{
          scale: { type: "spring", bounce: 0.5, duration: 0.5 },
          rotate: { duration: DURATION, ease: "easeInOut" },
        }}
      >
        <motion.g
          style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
          initial={{ rotate: 0 }}
          animate={reduce ? { rotate: 0 } : { rotate: SHAKE }}
          transition={{ duration: DURATION, delay: DELAY, ease: "easeInOut" }}
        >
          <motion.path
            initial={{ d: reduce ? LEFT_UP : LEFT_FOLDED }}
            animate={{ d: folded ? LEFT_FOLDED : LEFT_UP }}
            transition={
              reduce ? { duration: 0 } : folded ? fold : unfurl(DELAY)
            }
            stroke="var(--color-black)"
            strokeWidth={52}
            strokeLinecap="round"
          />
          <motion.path
            initial={{ d: reduce ? RIGHT_UP : RIGHT_FOLDED }}
            animate={{ d: folded ? RIGHT_FOLDED : RIGHT_UP }}
            transition={
              reduce ? { duration: 0 } : folded ? fold : unfurl(DELAY + 0.06)
            }
            stroke="var(--color-black)"
            strokeWidth={52}
            strokeLinecap="round"
          />

          <path
            d={PALM}
            stroke="var(--color-black)"
            strokeWidth={52}
            strokeLinecap="round"
          />
          <path
            d={KNUCKLES}
            stroke="var(--color-black)"
            strokeWidth={52}
            strokeLinecap="round"
          />

          <motion.path
            d={HEART}
            fill="var(--color-red-600)"
            stroke="var(--color-red-600)"
            strokeWidth={54}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
            initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
            animate={{
              scale: reduce ? 1 : folded ? 0 : [0, 1.35, 1],
              opacity: reduce || !folded ? 1 : 0,
              rotate: reduce ? 0 : folded ? -20 : [-20, 6, 0],
              y: reduce ? 0 : folded ? 12 : [12, -5, 0],
            }}
            transition={{
              duration: 0.42,
              delay: reduce || folded ? 0 : DELAY + DURATION * 0.45,
              ease: "backOut",
            }}
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
