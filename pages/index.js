"use client";
import Link from "next/link";
import { Grid, Container, Text } from "@nextui-org/react";

import { useAccount, useConnect, useSigner } from "wagmi";

import ProfileModal from "../components/profilemodal";
import Header from "../components/header";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import { RainbowButton } from "../components/button";

export default function IndexPage() {
  const { data: signer, isSuccess } = useSigner();

  const [data, setData] = useState();
  const { supabase } = useSupabaseClient();
  const { status, address, connector: activeConnector } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const walletconnector = { activeConnector };

  useEffect(() => {
    checkProfile();
  });
  async function checkProfile() {
    if (status == "isconnected") {
      //auth is initialized and there is no user
      let { data, error, status } = await supabase
        .from("users")
        .select("*")
        .eq("walletaddress", address)
        .single();

      if (!data) {
        await supabase.from("users").insert({
          walletaddress: address,
          provider: walletconnector,
        });
      }
      if (res.error) {
        throw new Error("Failed to create user!");
      }
      if (error && status !== 406) {
        throw error;
      }
    }
  }

  return (
    <>
      {" "}
      <Header />
      <Container>
        <Text
          h1
          size={60}
          css={{
            align: "center",
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          4 Mo Beers
        </Text>
        <Text h2>Rainbow Kit w/NextAuth</Text>
        <Grid.Container gap={8} justify="center">
          <Grid lg>
            <Text>Wallet Status: {status}</Text>
          </Grid>
          <Grid lg>
            {status == "connected" ? (
              <>
                <Text>
                  <Link href="/profile" address={address}>
                    Profile {address}
                  </Link>

                  <Text>
                    <ProfileModal address={address} />
                  </Text>
                </Text>
                <Text>
                  {" "}
                  SignerOrProvider: {data}
                  {isSuccess}
                </Text>
              </>
            ) : (
              <></>
            )}
          </Grid>
          <Grid>
            <RainbowButton />
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}
