"use client";
import { useState, useEffect } from "react";
import {
  fetchWeatherData,
  formatForecastData,
} from "./services/weatherService";
import { translations } from "./utils/translations";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";

export default function HomePage() {
  const [lang, setLang] = useState("ar");
  const [activeCity, setActiveCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem("weather_lang") || "ar";
    const savedCity = localStorage.getItem("weather_city") || "Damascus";

    setLang(savedLang);
    setActiveCity(savedCity);

    getAllData(savedCity, savedLang);
  }, []);

  const getAllData = async (city, currentLang = lang) => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const current = await fetchWeatherData(
        "weather",
        { q: city },
        currentLang,
      );
      const forecastRaw = await fetchWeatherData(
        "forecast",
        { q: city },
        currentLang,
      );

      setWeather(current);
      setForecast(formatForecastData(forecastRaw));
      setActiveCity(city);

      localStorage.setItem("weather_city", city);
      localStorage.setItem("weather_lang", currentLang);
    } catch (err) {
      setError(
        currentLang === "ar"
          ? "عذراً، لم نتمكن من العثور على هذه المدينة!"
          : "Sorry, city not found!",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem("weather_lang", newLang);
    getAllData(activeCity, newLang);
  };

  return (
    <div
      className="min-h-screen p-4 md:p-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleLanguage}
            className="bg-yellow-400 text-blue-900 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-all cursor-pointer active:scale-95"
          >
            {t.langBtn}
          </button>
        </div>

        <Header onSearch={(city) => getAllData(city)} t={t} lang={lang} />

        <main className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center h-64 font-bold text-yellow-400 animate-pulse text-xl">
              {lang === "ar" ? "جارٍ التحميل..." : "Loading..."}
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center h-64 text-center px-4">
              <span className="text-5xl mb-4 text-yellow-400">⚠️</span>
              <p className="text-red-500 font-bold text-2xl animate-pulse">
                {error}
              </p>
            </div>
          ) : (
            <>
              {weather && (
                <CurrentWeather weather={weather} t={t} lang={lang} />
              )}
              {forecast.length > 0 && (
                <Forecast data={forecast} t={t} lang={lang} />
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
