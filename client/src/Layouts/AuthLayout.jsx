import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function AuthLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      
    {/* background */}
   <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-black to-[#020617]" />
   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_40%)]" />



      {/* animated glass card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
         className="relative z-10 w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl px-8 py-10"

        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AuthLayout;
