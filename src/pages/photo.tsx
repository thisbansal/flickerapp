import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchItems from "../component/SearchItems";

const Photos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { data: session } = useSession();
  const { page, tags } = router.query;
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<{ search?: string }> = ({ search }) => {
    router.push(`/photo?tags=${search}`);
  };

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  if (Array.isArray(page) || Array.isArray(tags)) {
    return <div>cant be array</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-around rounded-md shadow-sm"
        >
          <p className="pr-10 text-cyan-600">
            Signed in as {session?.user?.email}
          </p>
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <div className="h-5 w-5 text-cyan-400" aria-hidden="true" />
            </div>
            <input
              className="block w-full rounded-none rounded-l-md border-2 border-cyan-300 pl-10 focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm "
              placeholder="Search Tag"
              {...register("search", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="relative mr-10 -ml-px inline-flex items-center space-x-2 rounded-r-md border border-cyan-300 bg-cyan-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-cyan-100 focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600"
          >
            <div
              className="h-5 w-5 justify-center text-gray-400"
              aria-hidden="true"
            />
            <span>Search</span>
          </button>
          <button
            onClick={() => signOut()}
            type="button"
            className="ml-10 inline-flex items-center rounded-md border border-transparent bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-600 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </form>
      </div>
      <div className="flex h-full flex-1 flex-col pl-10">
        <div className="flex-1">
          {tags && <SearchItems page={page} tags={tags} />}
        </div>

        <div className="relative z-0 flex justify-center rounded-md p-2 shadow-sm">
          {parseInt(page || "", 10) > 0 && (
            <button
              type="button"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onClick={() => {
                router.push(
                  `/photo?tags=${tags}&page=${(
                    parseInt(page || "0", 10) - 1
                  ).toString()}`
                );
              }}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onClick={() => {
              router.push(
                `/photo?tags=${tags}&page=${(
                  parseInt(page || "0", 10) + 1
                ).toString()}`
              );
            }}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photos;
