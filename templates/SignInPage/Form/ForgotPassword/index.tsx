import { useState, useRef } from "react";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "@/components/Image";
import emailjs from "@emailjs/browser";

type ForgotPasswordProps = {
  onClick: () => void;
};

const ForgotPassword = ({ onClick }: ForgotPasswordProps) => {
  const form: any = useRef();
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  console.log(token);
  const onSubmitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post("/api/user/resetpassword", { email });
      //toast.success(data.message);
      setToken(data.token);

      //email
      setTimeout(() => {
        emailjs
          .sendForm(
            process.env.NEXT_PUBLIC_SERVICE_URL!,
            process.env.NEXT_PUBLIC_TEMPLATE_URL!,
            form.current,
            process.env.NEXT_PUBLIC_PUBLIC_URL!
          )
          .then(
            (result) => {
              console.log(result);
              setLoader(false);
              setEmail("");
              toast.success("An Email has been sent to your email address");
            },
            (error) => {
              console.log(error.text);
            }
          );
      }, 1500);
      //email
    } catch (err: any) {
      toast.error(err.response.data.message);
      setLoader(false);
    }
  };

  return (
    <>
      <button className="group flex items-center mb-8 h5" onClick={onClick}>
        <Icon
          className="mr-4 transition-transform group-hover:-translate-x-1 dark:fill-n-1"
          name="arrow-prev"
        />
        Reset your password
      </button>
      <form ref={form} onSubmit={onSubmitHandler}>
        <Field
          className="mb-6"
          classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
          placeholder="Email"
          icon="email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <input type="hidden" name="user_email" value={email} />
        <input
          type="hidden"
          value={`${process.env.NEXT_PUBLIC_SERVER_URL}/verifyemail?token=${token}`}
          name="message"
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

export default ForgotPassword;
