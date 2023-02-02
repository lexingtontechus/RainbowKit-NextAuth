import { ConnectButton } from "@rainbow-me/rainbowkit"
import { getServerSession } from "next-auth"
import { getAuthOptions } from "./api/auth/[...nextauth]"

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, getAuthOptions(req))
    }
  }
}

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12
      }}
    >
      <ConnectButton />
    </div>
  )
}

export default Home
