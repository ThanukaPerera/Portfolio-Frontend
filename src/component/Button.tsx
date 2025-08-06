// import React from 'react';

// interface ButtonProps {
//   text: string;
//   link?: string;
//   onClick?: () => void;
//   type?: 'button' | 'submit' | 'reset';
//   className?: string; // ✅ Add this
// }

// const Button: React.FC<ButtonProps> = ({
//   text,
//   link,
//   onClick,
//   type = 'button',
//   className = '', // ✅ Default empty string to avoid undefined
// }) => {
//   const classes = `flex justify-center items-center border-2 border-primaryColor rounded-md px-4 py-2 text-primaryColor cursor-pointer hover:bg-primaryColor hover:text-secondary transition-all duration-200 ${className}`.trim();

//   if (link) {
//     return (
//       <a href={link} className={classes}>
//         {text}
//       </a>
//     );
//   }

//   return (
//     <button type={type} onClick={onClick} className={classes}>
//       {text}
//     </button>
//   );
// };

// export default Button;


import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const baseClasses = `flex justify-center items-center border-2 border-primaryColor rounded-md px-4 py-2 text-primaryColor cursor-pointer hover:bg-primaryColor hover:text-secondaryColor transition-all duration-200 hover:border-secondaryColor`;

const MotionButton = motion.button;
const MotionAnchor = motion.a;

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  onClick,
  type = 'button',
  className = '',
}) => {
  const combinedClasses = `${baseClasses} ${className}`.trim();

  const animationProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 300 },
  };

  if (link) {
    return (
      <MotionAnchor
        href={link}
        className={combinedClasses}
        {...animationProps}
      >
        {text}
      </MotionAnchor>
    );
  }

  return (
    <MotionButton
      type={type}
      onClick={onClick}
      className={combinedClasses}
      {...animationProps}
    >
      {text}
    </MotionButton>
  );
};

export default Button;
