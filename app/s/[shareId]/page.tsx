interface SharePageProps {
  params: {
    shareId: string;
  };
}
import Image from "next/image";
export default async function SharePage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  console.log("baseurl = ",baseUrl);

  const res = await fetch(
    `${baseUrl}/api/public/${shareId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>File not found or expired</div>;
  }

  const file = await res.json();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{file.name}</h2>

      {file.fileType === "video" ? (
        <video controls width="800">
          <source src={`/api/files/${file._id}`} type={`video/${file.fileExtension}`} />
        </video>
      ) : file.fileType === "image" ? (
        <Image
          src={`/api/files/${file._id}`}
          alt={file.name}
          style={{ maxWidth: "800px" }}
        />
      ) : (
        <a href={`/api/files/${file._id}`} download>
          Download File
        </a>
      )}
    </div>
  );
}