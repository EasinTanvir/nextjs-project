import type { NextPage, GetServerSidePropsContext } from "next";
import SignInPage from "@/templates/SignInPage";
import { getSession } from "next-auth/react";

const SignIn: NextPage = () => {
  return <SignInPage />;
};

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permananet: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default SignIn;
