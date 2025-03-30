import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedPageNumberProps {
  page: number;
}

const AnimatedPageNumber = ({ page }: AnimatedPageNumberProps) => {
  const [prevPage, setPrevPage] = useState(page);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (page !== prevPage) {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setPrevPage(page);
        setAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [page]);

  return (
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 sm:w-12 sm:h-12 overflow-hidden text-white text-sm font-medium text-center rounded bg-purple-600">
      <AnimatePresence initial={false}>
        {animating && (
          <motion.div
            key={`prev-${prevPage}`}
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {prevPage}
          </motion.div>
        )}
        <motion.div
          key={`current-${page}`}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {page}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPageNumber;
