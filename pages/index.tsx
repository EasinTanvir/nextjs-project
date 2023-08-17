import type { NextPage, GetServerSidePropsContext } from "next";
import HomePage from "@/templates/HomePage";
import { getSession } from "next-auth/react";
const Home: NextPage = () => {
  return <HomePage />;
};

export default Home;
