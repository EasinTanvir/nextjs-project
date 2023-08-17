import { useState } from "react";
import Link from "next/link";
import Field from "@/components/Field";
import axios from "axios";
import Image from "@/components/Image";
import toast from "react-hot-toast";
import { useToast } from "@chakra-ui/react";

type CreateAccountProps = {
  userName: string;
  email: string;
  password: string;
};

const CreateAccount = () => {
  const toasts = useToast();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const onSubmitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendData: CreateAccountProps = {
      userName,
      email,
      password,
    };
    try {
      setLoader(true);
      const { data } = await axios.post("/api/auth/signup", sendData);
      toasts({
        title: "Success!",
        description: data.user,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      //toast.success(data.user);
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      //toast.error(err.response.data.message);
      toasts({
        title: "Authentication Error",
        description: err.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <form action="" onSubmit={onSubmitHandler}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="userName"
        icon="profile"
        type="text"
        value={userName}
        onChange={(e: any) => setUserName(e.target.value)}
        required
      />{" "}
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Email"
        icon="email"
        type="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />
      <Field
        className="mb-6"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      <button className="btn-blue btn-large w-full mb-6" type="submit">
        {loader ? (
          <Image src="/images/loader.svg" width={24} height={24} alt="" />
        ) : (
          "Create Account"
        )}
      </button>
      <div className="text-center caption1 text-n-4">
        By creating an account, you agree to our{" "}
        <Link
          className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
          href="/"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
          href="/"
        >
          Privacy & Cookie Statement
        </Link>
        .
      </div>
    </form>
  );
};

export default CreateAccount;
