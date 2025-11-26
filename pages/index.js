// pages/index.js
import Head from "next/head";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import NewsList from "../components/NewsList";
import Navbar from "@/components/Navbar";

export default function Home({ initialArticles, initialTotal }) {
  const [articles, setArticles] = useState(initialArticles || []);
  const [totalResults, setTotalResults] = useState(initialTotal || 0);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 12;

  useEffect(() => {

    async function fetchData() {
      setLoading(true);

      try {
        const q = query ? `&q=${encodeURIComponent(query)}` : "";
        const cat = query ? "" : `&category=${category}`;

        const res = await fetch(
          `/api/news?page=${page}&pageSize=${PAGE_SIZE}${q}${cat}`
        );

        const data = await res.json();

        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        console.error("Error fetching news:", err);
        setArticles([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, category, page]);

  return (
    <div>
      <Head>
        <title>News App</title>
      </Head>

      <main className="w-full px-4 py-8 max-w-[1400px] mx-auto">

        <Navbar
          searchValue={query}
          onSearchChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
        />

        <div className="mt-6">
          <Categories
            selected={category}
            onSelect={(c) => {
              setCategory(c);
              setQuery("");
              setPage(1);
            }}
          />
        </div>

        <div className="mt-8">
          <NewsList
            articles={articles}
            loading={loading}
            total={totalResults}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={(p) => setPage(p)}
          />
        </div>

      </main>
    </div>
  );
}

// ------------------------------
// SERVER SIDE PROPS
// ------------------------------
export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEWS_API_BASE}/v2/top-headlines?country=us&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`
  );

  const data = await res.json();

  return {
    props: {
      initialArticles: data.articles || [],
      initialTotal: data.totalResults || 0,
    },
  };
}
