export async function searchRestaurants(
  location: string,
  budget: string,
  cuisine: string
): Promise<string> {
  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) return "";

  const priceMap: Record<string, string> = { $: "1", $$: "1,2", $$$: "2,3,4" };
  const price = priceMap[budget] ?? "1,2";

  const params = new URLSearchParams({
    location,
    term: cuisine !== "any" ? cuisine + " restaurant" : "restaurant",
    price,
    limit: "5",
    sort_by: "rating",
  });

  try {
    const res = await fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) return "";
    const data = await res.json();
    return data.businesses
      .map(
        (b: { name: string; rating: number; price?: string; categories: { title: string }[]; location: { address1: string }; url: string }) =>
          `${b.name} | ${b.rating}★ | ${b.price ?? "?"} | ${b.categories.map((c) => c.title).join(", ")} | ${b.location.address1} | ${b.url}`
      )
      .join("\n");
  } catch {
    return "";
  }
}
