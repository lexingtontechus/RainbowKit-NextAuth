import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAccount, useConnect } from "wagmi";

export const RainbowButton = () => {
  const { supabase } = useSupabaseClient();
  const { status, address, connector: activeConnector } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const walletconnector = { activeConnector };

  useEffect(() => {
    if (address) checkProfile();
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
    <ConnectButton
      label="CONNECT WALLET"
      chainStatus="none"
      accountStatus={{
        smallScreen: "full",
        largeScreen: "full",
      }}
      showBalance={{
        smallScreen: false,
        largeScreen: true,
      }}
    />
  );
};
