import { useState, useEffect } from "react";

import { Button, css } from "@nextui-org/react";
import {
  Chain,
  Wallet,
  getWalletConnectConnector,
} from "@rainbow-me/rainbowkit";

import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import UAuth from "@uauth/js";
import { UAuthConnector } from "@uauth/web3-react";

import uauthModule from "@web3-onboard/uauth";

// initialize the module with options
const connector = uauthModule({
  clientID: process.env.NEXT_PUBLIC_UAUTH_CLIENT_ID,
  redirectUri: process.env.NEXT_PUBLIC_UAUTH_REDIRECT_URI,
  scope: "openid wallet",
  // shouldLoginWithRedirect?: false
  //bridge?: 'YOUR_CUSTOM_BRIDGE_SERVER',
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

export const UDConnector = {
  id: "Unstoppable Domains",
  name: "Unstoppable Domains",
  iconUrl: "https://my-image.xyz",
  iconBackground: "#0c2f78",

  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://my-wallet/learn-more",
          steps: [
            {
              description:
                "We recommend putting My Wallet on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the My Wallet app",
            },
            {
              description:
                "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the scan button",
            },
          ],
        },
      },
    };
  },
};
