import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

export default function SearchBar({ value = "", onChange = () => {} }) {
  const { theme } = useTheme();

  const [inputValue, setInputValue] = useState(value);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const ref = useRef(null);

  // Sync internal input value when parent value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Load search history on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("search_history") || "[]");
    setHistory(saved.slice(0, 5));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Save search + trigger parent onChange
  const handleSearch = () => {
    if (!inputValue.trim()) return;

    // Update history
    const updated = [inputValue, ...history.filter((h) => h !== inputValue)];
    const topFive = updated.slice(0, 5);
    setHistory(topFive);
    localStorage.setItem("search_history", JSON.stringify(topFive));

    // 🔥 THIS is the real search
    onChange(inputValue);

    setShowHistory(false);
  };

  return (
    <div className="relative w-full mb-6" ref={ref}>
      <div className="flex items-center gap-3 w-full">

        {/* Input */}
        <div className="relative flex-1">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setShowHistory(true)}
            placeholder="Search news..."
            className={
              `w-full pl-4 pr-4 py-2.5 rounded-lg border 
               focus:ring-2 focus:outline-none transition-all duration-300 ` +
              (theme === "light"
                ? "bg-white border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-blue-600/20"
                : "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20")
            }
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300
            ${theme === "light"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Search
        </button>
      </div>

      {/* Dropdown History */}
      {showHistory && history.length > 0 && (
        <div
          className={
            `absolute left-0 right-0 mt-2 rounded-lg shadow-lg border z-20 max-h-60 overflow-y-auto 
            ${theme === "light"
              ? "bg-white border-gray-200"
              : "bg-gray-800 border-gray-700"
            }`
          }
        >
          <div className="px-4 py-2 text-xs uppercase text-gray-500 dark:text-gray-400">
            Recent Searches
          </div>

          {history.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setInputValue(item);
                onChange(item); // triggers new search
                setShowHistory(false);
              }}
              className={
                `w-full text-left px-4 py-2 text-sm 
                 hover:bg-gray-100 dark:hover:bg-gray-700 
                 transition-colors duration-200
                 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`
              }
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
