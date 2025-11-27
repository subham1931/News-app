export default async function handler(req, res) {
  const { page = 1, pageSize = 12, q = "", category = "" } = req.query;

  const API_KEY = process.env.NEWS_API_KEY;
  const BASE_URL = process.env.NEWS_API_BASE || "https://newsapi.org";

  if (!API_KEY) {
    return res.status(500).json({
      status: "error",
      message: "Missing NEWS_API_KEY in .env.local",
    });
  }

  try {
    let url = "";

    if (q) {
      url = `${BASE_URL}/v2/everything?q=${encodeURIComponent(
        q
      )}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    } else {
      url = `${BASE_URL}/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

      if (category) {
        url += `&category=${category}`;
      }
    }

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: "Failed to fetch news",
    });
  }
}
