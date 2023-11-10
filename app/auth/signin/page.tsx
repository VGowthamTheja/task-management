"use client";

import { Button } from "@nextui-org/react";
import { getProviders, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

const SignInPage = () => {
  const [providers, setProviders] = useState<Array<string>>();
  useEffect(() => {
    async function fetchProviders() {
      const providers = await getProviders();
      if (providers) {

        setProviders(Object.keys(providers));
      }
    }
    fetchProviders();
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col absolute space-y-4 mx-auto top-[40%]">
        <h1 className="text-2xl text-center font-bold">Sign In</h1>

        {providers?.map((provider) => (
          <Button
            key={provider}
            className="px-4 py-2 border border-gray-300 rounded-md"
            onClick={() => signIn(provider,{
              redirect: true,
              callbackUrl: '/'
            })}
          >
            Sign in with {provider}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SignInPage;
