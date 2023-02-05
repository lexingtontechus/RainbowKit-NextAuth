import ProfileUpdate from "../components/profileupdate";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
//import {  } from "ethers/lib/utils.js";

import { useAccount, useConnect } from "wagmi";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import Link from "next/link";

export default function Profile() {
  const { status, isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (status == "disconnected") {
      //auth is initialized and there is no user

      router.push("/");
    }
  }, [isDisconnected, router]);

  return (
    <>
      <div>{status}</div>
      <div>
        <ProfileUpdate />
      </div>
      <div>
        <Link href="/">HOME</Link>
      </div>
    </>
  );
}
//  return null;

{
  /*export async function getServerSideProps() {
  const { isDisconnected } = useAccount();
  if (isDisconnected) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }
}
*/
}