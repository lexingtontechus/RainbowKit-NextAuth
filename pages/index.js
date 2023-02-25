"use client";
import Link from "next/link";
import { Grid, Container, Text } from "@nextui-org/react";

import { useAccount, useConnect } from "wagmi";

import ProfileModal from "../components/profilemodal";
import Header from "../components/header";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function IndexPage() {
  const { supabase } = useSupabaseClient();
  const user = useUser();
  const { status, address, connector: activeConnector } = useAccount();
  const { connectors } = useConnect();

  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("walletaddress", address);
      setData(data);
      if (!data) {
        await supabase.from("users").insert({
          walletaddress: address,
        });
      }
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  return (
    <>
      <Container>
        <Header />
        <Text
          h1
          size={60}
          css={{
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
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}
