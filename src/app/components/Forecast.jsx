/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
export default function Forecast({ data, t, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mt-8"
    >
      <h3 className="text-xl font-bold text-white mb-4 px-2">
        {t.forecastTitle}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center hover:scale-105 transition-transform"
          >
            <p className="text-sm opacity-70">
              {new Date(item.dt * 1000).toLocaleDateString(
                lang === "ar" ? "ar-EG" : "en-US",
                { weekday: "short" },
              )}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="icon"
              className="mx-auto w-12 h-12"
            />
            <p className="text-lg font-bold">{Math.round(item.main.temp)}°</p>
            <p className="text-xs opacity-60 capitalize">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
