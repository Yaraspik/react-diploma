export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const paramsQ = url.searchParams.get("q") || "";
  const paramsCategory = Number(url.searchParams.get("category") || "");
  return { paramsQ, paramsCategory };
}
