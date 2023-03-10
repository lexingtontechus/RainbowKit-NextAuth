import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import React from "react";
import Link from "next/link";
import { Container } from "@nextui-org/react";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  // If you have a value for "address" here, your
  // server knows the user is authenticated.
  // You can then pass any data you want
  // to the page component here.
  return {
    props: {
      address,
      session,
    },
  };
};
export default function AuthenticatedPage({ address }) {
  return address ? (
    <Container>
      <Link href="/">Home</Link>
      <h1>Authenticated as {address}</h1>
    </Container>
  ) : (
    <Container>
      <Link href="/">Home</Link>
      <h1>Unauthenticated</h1>
    </Container>
  );
}
