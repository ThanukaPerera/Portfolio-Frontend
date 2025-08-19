

import { Montserrat } from 'next/font/google';
import { easeOut, motion } from 'framer-motion';

type SectionTitleProps = {
  title: string;
  description?: string;
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

// Parent container for stagger effect
const containerVariants = {
  hidden: { opacity: 1 }, // keep container visible, but children hidden
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }, // stagger letters
  },
};

// Each letter animation
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

// Description animation (delayed after title)
const descriptionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay: 0.5 }, // staged delay
  },
};

export default function SectionTitle({ title, description }: SectionTitleProps) {
  const words = title.split(" ");
  const lastWord = words.pop() || "";
  const firstPart = words.join(" ");

  // Helper for animated text
  const renderAnimatedText = (text: string, gradientClass: string) => (
    <span className={`${gradientClass} bg-clip-text text-transparent`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char} {/* keep spaces */}
        </motion.span>
      ))}
    </span>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className="mb-8 text-center"
    >
      <motion.h1
        variants={containerVariants}
        className={`text-3xl sm:text-4xl font-bold mb-6 ${montserrat.className}`}
      >
        {renderAnimatedText(firstPart + " ", "bg-gradient-to-r from-white via-slate-100 to-white")}
        {renderAnimatedText(lastWord, "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-800")}
      </motion.h1>

      {description && (
        <motion.p
          variants={descriptionVariants}
          className="text-sm w-md sm:w-full sm:text-md text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
