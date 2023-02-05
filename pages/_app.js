//import "../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  braveWallet,
  wallet,
} from "@rainbow-me/rainbowkit/wallets";

import { SessionProvider } from "next-auth/react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";

//import { initializeConnector } from "@web3-react/core";
//import UAuth from "@uauth/js";
//import { MetaMask } from "@web3-react/metamask";
//import { UAuthConnector } from "@uauth/web3-react";
//import uauthBNCModule from "@uauth/web3-onboard";
//import Onboard from "@web3-onboard/core";
//import uauthModule from "@web3-onboard/uauth";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
{
  /*
const uauth = new UAuth({
  clientID: "814a3502-e259-4972-9e2f-e0d5fe9482d8",
  redirectUri: "https://localhost:3000/",
  scope: "openid wallet email:optional",
  shouldLoginWithRedirect: false,

  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
  connectFirstChainId: true,
});
*/
}
const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "4MoBeers DAO Inc.",
  chains,
});

const AppInfo = {
  appName: "4MoBeers DAO Inc.",
};

const connectors = connectorsForWallets([
  ...wallets,

  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      braveWallet({ chains }),
      //wallet.brave({ chains, shimDisconnect: true }),
      //metaMaskWallet({ chains }),
      //rainbowWallet({ chains }),
    ],
  },
  {
    groupName: "Other",
    wallets: [
      //coinbaseWallet({ chains, appName: "My RainbowKit App" }),
      //walletConnectWallet({ chains }),
      trustWallet({ chains }),
      argentWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const Disclaimer = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{" "}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const getSiweMessageOptions = () => ({
  statement: "Sign in to 4MoBeers DAO",
});

//function MyApp({ Component, pageProps }) {
export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider
              coolMode
              appInfo={{
                appName: { AppInfo },
                disclaimer: Disclaimer,
              }}
              chains={chains}
              theme={darkTheme({
                accentColor: "#581c87",
                accentColorForeground: "#f4f4f5",
                borderRadius: "small",
                fontStack: "Sora",
                overlayBlur: "small",
              })}
            >
              <Component {...pageProps} />
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </SessionContextProvider>
    </WagmiConfig>
  );
}

//export default MyApp;
