import React from "react";
import { Navbar, css } from "@nextui-org/react";
import { Button } from "./button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ProfileModal from "../components/profilemodal";
import { useAccount, useConnect } from "wagmi";

export default function Header() {
  const { address, isDisconnected, status } = useAccount();
  return (
    <Navbar isBordered variant="floating" borderWeight="bold">
      <Navbar.Brand>LOGO</Navbar.Brand>
      <Navbar.Content>
        <Navbar.Item placement="bottom-right">
          <ConnectButton
            label="CONNECT"
            showBalance={false}
            chainStatus="none"
          />
        </Navbar.Item>

        <Navbar.Item placement="bottom-right">
          {status == "connected" ? (
            <>
              <ProfileModal address={address} />
            </>
          ) : (
            <></>
          )}
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
