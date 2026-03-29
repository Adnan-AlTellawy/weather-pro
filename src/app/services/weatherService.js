const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const fetchWeatherData = async (infoType, searchParams, lang = "ar") => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_KEY,
    units: "metric",
    lang: lang,
  });

  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching data");
  return await response.json();
};

const formatForecastData = (data) => {
  return data.list.filter((f) => f.dt_txt.includes("12:00:00")).slice(0, 5);
};

export { fetchWeatherData, formatForecastData };
