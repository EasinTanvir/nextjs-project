import { useState } from "react";
import Field from "@/components/Field";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "@/components/Image";
import toast from "react-hot-toast";

type SignInProps = {
  onClick: () => void;
};

const SignIn = ({ onClick }: SignInProps) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const result: any = await signIn("credentials", {
      redirect: false,
      email: name,
      password: password,
    });

    toast.error(result.error);
    setLoader(false);
    if (!result.error) {
      setLoader(false);
      toast.success("login successful");
      router.replace("/");
    }
  };

  return (
    <form action="" onSubmit={onSubmitHandler}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Username or email"
        icon="email"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        required
      />
      <Field
        className="mb-2"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      <button
        className="mb-6 base2 text-primary-1 transition-colors hover:text-primary-1/90"
        type="button"
        onClick={onClick}
      >
        Forgot password?
      </button>

      <button className="btn-blue btn-large w-full" type="submit">
        {loader ? (
          <Image src="/images/loader.svg" width={24} height={24} alt="" />
        ) : (
          " Sign in with OpenAgent"
        )}
      </button>
    </form>
  );
};

export default SignIn;
