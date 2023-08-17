import type { NextPage, GetServerSidePropsContext } from "next";
import HomePage from "@/templates/HomePage";
import { getSession } from "next-auth/react";
const Home: NextPage = () => {
  return <HomePage />;
};

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permananet: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
