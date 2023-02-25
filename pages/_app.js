//import "../styles/global.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import UDconnector from "../components/udconnector";

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
      // uauth({ chains }),
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
  autoConnect: false,
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

//RainbowKit Theme
const myRainbowTheme = {
  blurs: {
    modalOverlay: "",
  },
  colors: {
    accentColor: "#18181b",
    accentColorForeground: "#f4f4f5",
    actionButtonBorder: "#a855f7",
    actionButtonBorderMobile: "#a855f7",
    actionButtonSecondaryBackground: "",
    closeButton: "",
    closeButtonBackground: "",
    connectButtonBackground: "",
    connectButtonBackgroundError: "",
    connectButtonInnerBackground: "",
    connectButtonText: "#18181b",
    connectButtonTextError: "",
    connectionIndicator: "",
    downloadBottomCardBackground: "",
    downloadTopCardBackground: "",
    error: "",
    generalBorder: "#a855f7",
    generalBorderDim: "#a855f7",
    menuItemBackground: "",
    modalBackdrop: "",
    modalBackground: "#18181b",
    modalBorder: "",
    modalText: "#f4f4f5",
    modalTextDim: "#71717a",
    modalTextSecondary: "",
    profileAction: "",
    profileActionHover: "",
    profileForeground: "",
    selectedOptionBorder: "",
    standby: "",
  },
  fonts: {
    body: "",
  },
  radii: {
    actionButton: "",
    connectButton: "",
    menuButton: "",
    modal: "",
    modalMobile: "",
  },
  shadows: {
    connectButton: "true",
    dialog: "",
    profileDetailsAction: "",
    selectedOption: "",
    selectedWallet: "",
    walletLogo: "",
  },
};
//NEXTUI Theme
const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: "#4ADE7B",
      secondary: "#F9CB80",
      error: "#FCC5D8",
    },
  },
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
              //theme={myRainbowTheme}
              theme={darkTheme({
                accentColor: "#7e22ce",
                accentColorForeground: "#f4f4f5",
                actionButtonBorder: "#2563eb",
                borderRadius: "medium",
                connectButtonBackground: "#581c87",
                generalBorder: "#a855f7",
                generalBorderDim: "#a855f7",
                fontStack: "rounded",
                overlayBlur: "small",
                connectButtonBackground: "#a855f7",
                modalBackground: "#18181b",
                shadows: {
                  connectButton: "#dc2626",
                  dialog: "#dc2626",
                  profileDetailsAction: "#dc2626",
                  selectedOption: "#dc2626",
                  selectedWallet: "#dc2626",
                  walletLogo: "#dc2626",
                },
              })}
            >
              <NextUIProvider theme={theme}>
                <Component {...pageProps} />
              </NextUIProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </SessionContextProvider>
    </WagmiConfig>
  );
}

//export default MyApp;
