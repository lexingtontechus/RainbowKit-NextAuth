import Link from "next/link";
import Button from "../components/button";
import { useAccount, useConnect } from "wagmi";

import { getServerSession } from "next-auth";
import { getAuthOptions } from "./api/auth/[...nextauth]";
import Modal from "../components/modal";

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, getAuthOptions(req)),
    },
  };
};

export default function IndexPage() {
  const { address, isDisconnected, status } = useAccount();
  return (
    <>
      <div>Hello World- {status}.</div>
      <div>
        <Link href="/about">About</Link>
      </div>
      {status == "connected" ? (
        <>
          <div>
            <Link href="/profile" address={address}>
              Profile {address}
            </Link>
            <Button />
            <div>
              <Modal address={address} />
            </div>

            <div>
              <Link href="/protected" address={address}>
                Protected Page
              </Link>
            </div>
          </div>
        </>
      ) : (
        <Button />
      )}
    </>
  );
}
