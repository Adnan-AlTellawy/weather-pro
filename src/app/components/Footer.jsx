import {motion} from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaGithub,
  FaTelegramPlane,
  FaEnvelope,
  FaChevronUp,
} from "react-icons/fa";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{duration:1}} className="mt-12 pb-12 border-t border-white/10 pt-8 text-center relative">
      {/* زر العودة للأعلى */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-400 text-blue-900 p-2.5 rounded-full shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 z-50 opacity-90 hover:opacity-100 cursor-pointer"
        >
          <FaChevronUp size={16} />
        </button>
      )}

      {/* إجبار الاتجاه ليكون LTR دائماً لضمان ثبات الأيقونات والنصوص */}
      <div className="flex flex-col items-center gap-4" dir="ltr">
        {/* اسم المطور - ثابت بالإنجليزية */}
        <div className="group">
          <h3 className="text-xl font-bold text-yellow-400 tracking-wide transition-colors duration-300 ">
            Adnan Al-Tellawy
          </h3>
          <p className="text-[10px] text-cyan-200/60 uppercase tracking-[0.2em] mt-1 font-medium">
            Frontend Developer & Software Engineer
          </p>
        </div>

        {/* روابط التواصل - ثابتة مع تأثير Hover ناعم */}
        <div className="flex gap-8 mt-2">
          <a
            href="mailto:adnanaltellawy@gmail.com"
            className="text-white/50 hover:text-yellow-400 hover:-translate-y-1.5 transition-all duration-300 ease-out"
          >
            <FaEnvelope size={24} />
          </a>

          <a
            href="https://t.me/AdnanAlTellawy"
            target="_blank"
            rel="noreferrer"
            className="text-white/50 hover:text-[#26A5E4] hover:-translate-y-1.5 transition-all duration-300 ease-out"
          >
            <FaTelegramPlane size={24} />
          </a>
          <a
            href="https://github.com/Adnan-AlTellawy"
            target="_blank"
            rel="noreferrer"
            className="text-white/50 hover:text-white hover:-translate-y-1.5 transition-all duration-300 ease-out"
          >
            <FaGithub size={24} />
          </a>
        </div>

        {/* حقوق النشر - ثابتة بالإنجليزية بلون واضح */}
        <div className="text-[12px] text-white/70 mt-6 font-medium tracking-wide">
          © {currentYear}{" "}
          <span className="text-yellow-400 font-bold">Weather Pro</span>. All
          Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
}
