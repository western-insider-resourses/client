import StoryFeed from "@/components/StoryFeed";
import Sidebar from "@/components/Sidebar";

type SearchParams = Promise<{ page?: string }>;

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const sp = (await searchParams) ?? {};
  const page = Number(sp.page) || 1;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <StoryFeed
        params={{ page, limit: 11 }}
        withFeatured={page === 1}
        base="/"
        heading="Latest stories"
      />
      <Sidebar />
    </div>
  );
}
