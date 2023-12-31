import { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "@/components/Image";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const VerifyEmails = () => {
  const toasts = useToast();
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const onSubmitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toasts({
        title: "Update Password",
        description: "Password Didn't match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const sendData = {
        token,
        updatePassword: password,
      };

      try {
        setLoader(true);
        const { data } = await axios.post(
          "/api/user/updateresetpassword",
          sendData
        );

        toasts({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setPassword("");
        setConfirmPassword("");
        router.push("/sign-in");
      } catch (err: any) {
        toasts({
          title: "Failed",
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  return (
    <>
      <button className="group flex items-center mb-8 h5">
        <Icon
          className="mr-4 transition-transform group-hover:-translate-x-1 dark:fill-n-1"
          name="arrow-prev"
        />
        Update Password
      </button>
      <form action="" onSubmit={onSubmitHandler}>
        <Field
          className="mb-6"
          classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
          placeholder="Password"
          icon="lock"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          required
        />{" "}
        <Field
          className="mb-6"
          classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
          placeholder="Confirm Password"
          icon="lock"
          type="password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn-blue btn-large w-full mb-6" type="submit">
          {loader ? (
            <Image src="/images/loader.svg" width={24} height={24} alt="" />
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </>
  );
};

export default VerifyEmails;
