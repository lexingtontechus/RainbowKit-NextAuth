import ProfileUpdate from "../components/profileupdate";

//import {  } from "ethers/lib/utils.js";

import Link from "next/link";

import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import React from "react";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  // If you have a value for "address" here, your
  // server knows the user is authenticated.
  // You can then pass any data you want
  // to the page component here.
  if (!address)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {
      address,
      session,
    },
  };
};
export default function AuthenticatedPage({ address }) {
  return address ? (
    <>
      <div>
        <h1>Authenticated as {address}</h1>
        <ProfileUpdate />
        <Link href="/">Home</Link>
      </div>
    </>
  ) : (
    <>
      <div>
        <h1>Unauthenticated</h1>
        <Link href="/">Home</Link>
      </div>
    </>
  );
}
