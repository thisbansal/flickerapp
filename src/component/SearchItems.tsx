import { useRouter } from "next/router";
import useSWR from "swr";
import { PhotosErorr, PhotosResponse } from "../pages/api/photo";

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
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>something went wrong</div>;
  }

  return (
    <div>
      {JSON.stringify(data)}
      <div>
        {parseInt(page, 10) > 0 && (
          <button
            onClick={() => {
              router.push(
                `/photo?tags=${tags}&page=${(
                  parseInt(page as string, 10) - 1
                ).toString()}`
              );
            }}
          >
            Previous
          </button>
        )}
        {parseInt(page, 10) < data.photos.pages && (
          <button
            onClick={() => {
              router.push(
                `/photo?tags=${tags}&page=${(
                  parseInt(page, 10) + 1
                ).toString()}`
              );
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
export default SearchItems;
