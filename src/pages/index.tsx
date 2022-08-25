import { useSession, signIn, signOut } from "next-auth/react";

import { NextPage } from "next/types";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <h1 className="3xl underline">Signed in as {session?.user?.email}</h1>

        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to the App</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Home;
