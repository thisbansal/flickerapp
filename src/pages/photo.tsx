import { NextPage } from "next";
import { useSession } from "next-auth/react";
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
  const { page, tags } = router.query;
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<{ search?: string }> = ({ search }) => {
    console.log("search", search);
    router.push(`/photo?tags=${search}`);
  };

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  if (Array.isArray(page) || Array.isArray(tags)) {
    return <div>cant be array</div>;
  }

  return (
    <div>
      <div className="p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-1  flex max-w-lg rounded-md shadow-sm"
        >
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <div className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              className="block w-full rounded-none rounded-l-md border-gray-800 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
              placeholder="Search Tag"
              {...register("search", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <div
              className="h-5 w-5 justify-center text-gray-400"
              aria-hidden="true"
            />
            <span>Search</span>
          </button>
        </form>
      </div>
      {tags && <SearchItems page={page} tags={tags} />}
    </div>
  );
};

export default Photos;
