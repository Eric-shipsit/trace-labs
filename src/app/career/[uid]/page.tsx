type CareerDetailPageProps = {
  params: Promise<{
    uid: string;
  }>;
};

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { uid } = await params;

  return (
    <div>
      <h1>Career Detail Page</h1>
      <p>UID: {uid}</p>
    </div>
  );
}