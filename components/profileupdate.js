import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAccount, useConnect } from "wagmi";

import Button from "./button";

export default function Account() {
  const { address, connector: activeConnector } = useAccount();

  const wa = { address };

  const supabase = useSupabaseClient();
  //const user = useUser();

  const [loading, setLoading] = useState(true);

  //const [walletaddress, setWalletAddress] = useState(null);
  const [uuid, setUUID] = useState(null);
  const [beername, setBeername] = useState(null);
  const [beertitle, setBeertitle] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [email, setEmail] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    getProfile();
  }, [address]);

  async function getProfile(wa) {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("users")
        .select("*")
        .eq("walletaddress", address)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (!data) {
        setProvider(activeConnector.name);
        await supabase
          .from("users")
          .insert({ walletaddress: address, provider: provider })
          .single();
      }

      if (data) {
        setUUID(data.id);
        setWalletAddress(data.walletaddress);
        setEmail(data.email);
        setBeername(data.beername);
        setBeertitle(data.beertitle);
        setFullname(data.fullname);
        setProvider(data.provider);
        //setWebsite(data.website)
        //setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ beername, email, beertitle, fullname }) {
    try {
      setLoading(true);

      const updates = {
        id: uuid,
        beername,
        email,
        beertitle,
        fullname,
        provider,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("users").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>{address}</div>
      <div>{uuid}</div>
      <div>{activeConnector.name}</div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="beername">Beername</label>
        <input
          id="beername"
          type="text"
          value={beername || ""}
          onChange={(e) => setBeername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="beertitle">Beer Title</label>
        <input
          id="beertitle"
          type="text"
          value={beertitle || ""}
          onChange={(e) => setBeertitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fullname">Full name</label>
        <input
          id="fullname"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="provider">Provider</label>
        <input id="provider" type="text" value={provider || ""} disabled />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({ beername, email, beertitle, fullname })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <Button />
      </div>
    </div>
  );
}
