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
        <h1>4 Mo Beers</h1>
        <h2>Rainbow Kit w/NextAuth</h2>
        <Grid.Container gap={8} justify="center">
          <Grid lg>
            <div>Wallet Status: {status}</div>
            <div>
              <Link href="/protected" address={address}>
                Verify Authenticated Status
              </Link>
            </div>
          </Grid>
          <Grid lg>
            {status == "connected" ? (
              <>
                <div>
                  <Link href="/profile" address={address}>
                    Profile {address}
                  </Link>

                  <div>
                    <ProfileModal address={address} />
                  </div>
                </div>
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
