import handler from "@/pages/api/news";

describe("News API", () => {
  test("API returns correct data", async () => {
    // MOCK ENV
    process.env.NEWS_API_KEY2 = "TEST_KEY";
    process.env.NEWS_API_BASE = "https://example.com";

    // MOCK fetch()
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            articles: [{ title: "API Article" }],
            totalResults: 1,
          }),
      })
    );

    const req = {
      query: { page: 1, pageSize: 10, q: "", category: "general" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith({
      articles: [{ title: "API Article" }],
      totalResults: 1,
    });
  });
});
