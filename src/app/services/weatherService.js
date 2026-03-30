// const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
// const BASE_URL = "https://api.openweathermap.org/data/2.5";

// const fetchWeatherData = async (infoType, searchParams, lang = "ar") => {
//   const url = new URL(`${BASE_URL}/${infoType}`);
//   url.search = new URLSearchParams({
//     ...searchParams,
//     appid: API_KEY,
//     units: "metric",
//     lang: lang,
//   });

//   const response = await fetch(url);
//   if (!response.ok) throw new Error("Error fetching data");
//   return await response.json();
// };

// const formatForecastData = (data) => {
//   return data.list.filter((f) => f.dt_txt.includes("12:00:00")).slice(0, 5);
// };

// export { fetchWeatherData, formatForecastData };
const API_KEY = "4abd84d13219e4e06147657fcd0d7d3d"; // ضع الكود المكون من أرقام وحروف هنا

export const fetchWeatherData = async (endpoint, params, lang = "ar") => {
  const queryParams = new URLSearchParams({
    ...params,
    appid: API_KEY,
    units: "metric",
    lang: lang,
  });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/${endpoint}?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

export const formatForecastData = (data) => {
  if (!data || !data.list) return [];
  // نأخذ قراءة واحدة من كل يوم (مثلاً الساعة 12 ظهراً)
  return data.list.filter((item) => item.dt_txt.includes("12:00:00"));
};