import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connect } from "db/mongoConfig";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import USER from "models/auth";
connect();

interface Credential {
  userName?: string;
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token._id = user._id;
      if (user?.name) token.name = user.name;

      return token;
    },

    async session({ session, token }: any) {
      if (token?._id) session.user._id = token._id;
      if (token?.name) session.user.name = token.name;

      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    CredentialsProvider({
      //@ts-ignore
      async authorize(credentials: Credential) {
        const { email, password } = credentials;
        let findUser;

        try {
          findUser = await USER.findOne({
            $or: [{ email: email }, { userName: email }],
          });
        } catch (err) {
          throw new Error("Find User failed");
        }
        if (!findUser) {
          throw new Error("No User Found");
        }

        let passwords;

        try {
          passwords = await bcrypt.compare(password, findUser.password);
        } catch (err) {
          throw new Error("Find password failed");
        }

        if (!passwords) {
          throw new Error("Invalid Password");
        }
        return {
          _id: findUser._id,
          name: findUser.userName,
          email: findUser.email,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
