import { motion } from "framer-motion";
export default function CurrentWeather({ weather, t, lang }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl text-center relative"
    >
      <h2 className="text-3xl font-bold mb-1 text-white">{weather.name}</h2>
      <p className="text-lg opacity-80 mb-4 capitalize text-cyan-100">
        {weather.weather[0].description}
      </p>

      <div className="flex items-center justify-center gap-2 mb-6" dir="ltr">
        <div className="text-8xl font-black text-white leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
          {Math.round(weather.main.temp)}°
        </div>

        <img src={iconUrl} alt="weather icon" className="w-20 h-20" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-white/10 pt-6">
        <div className="flex flex-col items-center gap-1">
          <span className="text-red-400 text-xl">↑</span>
          <span className="text-xs opacity-70 text-white">{t.max}</span>
          <span className="font-bold text-white">
            {Math.round(weather.main.temp_max)}°
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-blue-400 text-xl">↓</span>
          <span className="text-xs opacity-70 text-white">{t.min}</span>
          <span className="font-bold text-white">
            {Math.round(weather.main.temp_min)}°
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xl">💧</span>
          <span className="text-xs opacity-70 text-white">{t.humidity}</span>
          <span className="font-bold text-white">{weather.main.humidity}%</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xl">🌬️</span>
          <span className="text-xs opacity-70 text-white">{t.wind}</span>
          <span className="font-bold text-white leading-tight text-sm">
            {weather.wind.speed} {lang === "ar" ? "م/ث" : "m/s"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
