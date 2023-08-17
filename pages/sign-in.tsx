import type { NextPage, GetServerSidePropsContext } from "next";
import SignInPage from "@/templates/SignInPage";
import { getSession } from "next-auth/react";

const SignIn: NextPage = () => {
  return <SignInPage />;
};

export default SignIn;
