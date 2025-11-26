import { useTheme } from "../context/ThemeContext";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default function Categories({ selected, onSelect }) {
  const { theme } = useTheme();

  return (
    <div className="flex gap-3 flex-wrap mt-4">
      {categories.map((c) => {
        const active = c === selected;

        return (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`
              px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-200
              border shadow-sm
              ${
                active
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : theme === "light"
                  ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
              }
            `}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
