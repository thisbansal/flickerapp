import { useRouter } from "next/router";
import useSWR from "swr";
import { PhotosErorr, PhotosResponse } from "../pages/api/photo";
import Image from "next/image";

const SearchItems: React.FC<{ tags: string; page: string | undefined }> = ({
  tags,
  page = "0",
}) => {
  const router = useRouter();
  const { data, error } = useSWR<PhotosResponse, PhotosErorr>(
    `/api/photo?tags=${tags}&page_number=${page}`,
    async () => {
      return fetch(`/api/photo?tags=${tags}&page_number=${page}`).then((res) =>
        res.json()
      );
    }
  );

  if (!data) {
    return <div className="text-cyan-600">Loading ...</div>;
  }

  if (error) {
    return <div className="text-cyan-600">something went wrong</div>;
  }

  return (
    <div>
      {data.photos.photo.map((photo) => {
        if (!photo.url_w) {
          return <div></div>;
        }

        return (
          <Image
            key={photo.id}
            src={photo.url_w}
            alt="Picture of the author"
            width={400}
            height={320}
          />
        );
      })}
    </div>
  );
};
export default SearchItems;
