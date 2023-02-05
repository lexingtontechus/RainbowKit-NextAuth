import Link from "next/link";
import Button from "../components/button";
import { useAccount, useConnect } from "wagmi";

import { getServerSession } from "next-auth";
import { getAuthOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, getAuthOptions(req)),
    },
  };
};

export default function IndexPage() {
  const { address, isDisconnected } = useAccount();
  return (
    <>
      <div>
        Hello World. <Link href="/about">About</Link>
      </div>
      <div>
        Rainbow.{" "}
        {isDisconnected ? (
          <Button />
        ) : (
          <>
            {" "}
            <Link href="/profile" address={address}>
              Profile {address}
            </Link>
            <Button />
          </>
        )}
      </div>

      <div>
        <Link href="/protected" address={address}>
          Protected Page
        </Link>
      </div>
    </>
  );
}
