"use client";
import { useState } from "react";

export default function Header({ onSearch, t, lang }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      
    }
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
      <h1 className="text-2xl font-black text-white">{t.title}</h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full sm:w-80 flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full px-5 py-3 rounded-full bg-white/10 text-white placeholder:text-white/50 outline-none border border-white/20 focus:ring-2 focus:ring-yellow-300 transition"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 cursor-pointer active:scale-95"
        >
          {t.searchBtn}
        </button>
      </form>
    </header>
  );
}
