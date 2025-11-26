import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function NewsList({
  articles,
  loading,
  total,
  page,
  pageSize,
  onPageChange,
}) {
  const { theme } = useTheme();

  // Loader
  if (loading) {
  return (
    <div className="flex justify-center items-center py-20 min-h-[calc(100vh-20rem)]">
      <div
        role="status"
        aria-label="loading"
        className="h-8 w-8 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 rounded-full animate-spin"
      ></div>
    </div>
  );
}


  // No data
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 dark:text-gray-300">
        No articles found.
      </div>
    );
  }

  return (
    <div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((a) => {
          const encodedUrl = Buffer.from(a.url).toString("base64");
          const img = a.urlToImage || "/placeholder.jpg";

          return (
            <div
              key={a.url}
              className={`
                rounded-xl overflow-hidden 
                shadow-sm hover:shadow-md 
                transition-all duration-200 border
                ${theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-gray-900 border-gray-700 shadow-none hover:shadow-lg"} 
              `}
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={img}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4">
                {/* Title */}
                <h3
                  className={`font-semibold line-clamp-2 transition-colors duration-200
                    ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
                >
                  {a.title}
                </h3>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">

                  {/* Read */}
                  <Link
                    href={{
                      pathname: `/article/${encodedUrl}`,
                      query: { full: JSON.stringify(a) },
                    }}
                    className="flex-1"
                  >
                    <button
                      className={`
                        w-full px-4 py-2 rounded-md font-medium text-sm 
                        transition-all duration-200
                        ${theme === "light"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-blue-500 text-white hover:bg-blue-600"} 
                      `}
                    >
                      Read
                    </button>
                  </Link>

                  {/* Source */}
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`
                      px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
                      border
                      ${theme === "light"
                        ? "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                        : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"}
                    `}
                  >
                    Source
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-10">

        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`
            px-4 py-2 rounded-md border transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            ${theme === "light"
              ? "bg-white border-gray-300 hover:bg-gray-100"
              : "bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800"}
          `}
        >
          Prev
        </button>

        <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
          Page {page} of {Math.ceil(total / pageSize)}
        </span>

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={articles.length < pageSize}
          className={`
            px-4 py-2 rounded-md border transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            ${theme === "light"
              ? "bg-white border-gray-300 hover:bg-gray-100"
              : "bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800"}
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}
