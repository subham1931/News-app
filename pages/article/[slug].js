  import { useRouter } from "next/router";
  import Head from "next/head";
  import { useTheme } from "@/context/ThemeContext";

  export default function ArticlePage({ article }) {
    const router = useRouter();
    const { theme } = useTheme();

    const isDark = theme === "dark";

    if (!article) {
      return (
        <div
          className={`min-h-screen p-6 mx-auto max-w-3xl transition-colors
          ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
        >
          <button
            onClick={() => router.back()}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border mb-6
            ${isDark
              ? "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200"
              : "border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold mb-3">Article unavailable</h1>

          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            This article cannot be displayed because the full data is missing.
            NewsAPI does not support fetching a single article directly.
          </p>
        </div>
      );
    }

    return (
      <div
        className={`min-h-screen p-6 mx-auto max-w-3xl transition-colors
        ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
      >
        <Head>
          <title>{article.title}</title>
        </Head>

        <button
          onClick={() => router.back()}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border mb-6 
          ${isDark
            ? "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700"
          } transition-all`}
        >
          ← Back
        </button>

        <h1 className="text-3xl font-extrabold leading-tight mb-4">
          {article.title}
        </h1>
        <div className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {article.source?.name && (
            <span className="mr-4">Source: {article.source.name}</span>
          )}
          {article.publishedAt && (
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg mb-6 shadow"
          />
        )}

        {article.description && (
          <p
            className={`text-lg mb-4 leading-relaxed 
            ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            {article.description}
          </p>
        )}

        {article.content && (
          <p
            className={`mb-8 leading-relaxed 
            ${isDark ? "text-gray-400" : "text-gray-700"}`}
          >
            {article.content.replace(/\[\+\d+ chars]/, "")}
          </p>
        )}

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
          shadow-md active:scale-95 transition-all
          ${isDark
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Read Full Article →
        </a>
      </div>
    );
  }

  export async function getServerSideProps({ params, query }) {
    try {
      const encoded = params.slug;
      const decodedUrl = Buffer.from(encoded, "base64").toString("utf-8");

      const article = query.full ? JSON.parse(query.full) : null;

      return { props: { article: article || null } };
    } catch {
      return { props: { article: null } };
    }
  }
