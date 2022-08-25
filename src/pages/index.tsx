import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { NextPage } from "next/types";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/photo");
  }
  return (
    <>
      <div className="min-h-screen   bg-cyan-600">
        <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl sm:tracking-tight">
            <span className="block">Welcome to the App</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Use your google account to sign in
          </p>
          <button
            onClick={() => signIn()}
            className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-cyan-600 hover:bg-cyan-50 sm:w-auto"
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
