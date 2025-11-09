import { BlogPost } from "../../../../components/BlogPost";

export default async function Page({
  params,
}: {
  params: { userId: string; slug: string };
}) {
  const resolvedParams = await params;
  return <BlogPost slug={resolvedParams.slug} />;
}
