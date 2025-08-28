import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface StepButtonProps {
  onClick: () => void;
  children: ReactNode;           
  className?: string;            
  iconLeft?: ReactNode;          
  iconRight?: ReactNode;         
}

const StepButton: React.FC<StepButtonProps> = ({
  onClick,
  children,
  className = "",
  iconLeft,
  iconRight,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 font-semibold py-4 rounded-2xl transition-colors ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {iconLeft && <span>{iconLeft}</span>}
      <span className="truncate">{children}</span>
      {iconRight && <span>{iconRight}</span>}
    </motion.button>
  );
};

export default StepButton;
