import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import Logo from "@/components/Logo";
import Image from "@/components/Image";
import VerifyEmails from "../VerifyEmail";
import { signIn, signOut, useSession } from "next-auth/react";

const tabNav = ["Sign in", "Create account"];

type FormProps = {};

const Form = ({}: FormProps) => {
  const [forgot, setForgot] = useState<boolean>(false);

  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";

  return (
    <div className="w-full max-w-[31.5rem] m-auto">
      <>
        <Logo className="max-w-[11.875rem] mx-auto mb-8" dark={isLightMode} />
        <Tab.Group defaultIndex={0}>
          <div className="flex items-center my-8 md:my-4">
            <span className="grow h-0.25 bg-n-4/50"></span>
            <span className="shrink-0 mx-5 text-n-4/50">OR</span>
            <span className="grow h-0.25 bg-n-4/50"></span>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <VerifyEmails />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </>
    </div>
  );
};

export default Form;
