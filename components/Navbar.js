import { useTheme } from "../context/ThemeContext";
import SearchBar from "./SearchBar";

export default function Navbar({ searchValue, onSearchChange }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-6 pb-8 flex flex-col gap-6 sticky top-0 z-50 shadow-sm border-b transition-colors duration-300
        ${theme === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-900 border-gray-700"
        }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1
            className={`text-3xl font-extrabold tracking-tight
            ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
          >
            Top Headlines
          </h1>

          <p
            className={`text-sm mt-1
            ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
          >
            Discover the latest news from around the world
          </p>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className={`p-3 rounded-full shadow-sm border transition-all duration-300 
            ${theme === "light"
              ? "bg-gray-100 border-gray-300 hover:bg-gray-200"
              : "bg-gray-800 border-gray-700 hover:bg-gray-700"
            }`}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2m6.364 1.636l-1.414 1.414M21 12h-2M18.364 18.364l-1.414-1.414M12 19v2M6.05 18.364l1.414-1.414M3 12h2M6.05 5.636l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="w-full">
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>
    </nav>
  );
}
