import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAccount } from "wagmi";

export default function Account() {
  const { address } = useAccount();
  const wa = { address };
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  const [walletaddress, setWalletAddress] = useState(null);
  const [uuid, setUUID] = useState(null);
  const [beername, setBeername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    getProfile();
  }, [address]);

  async function getProfile(wa) {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("users")
        .select(`*`)
        .eq("walletaddress", address)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (!data) {
        const res = await supabase
          .from("users")
          .insert({ walletaddress: address })
          .single();

        if (res.error) {
          throw new Error("Failed to create user!");
        }
      }

      if (data) {
        setUUID(data.id);
        setWalletAddress(data.walletaddress);

        setEmail(data.email);
        setBeername(data.beername);

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

  async function updateProfile({ beername }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        beername,
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
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={email} disabled />
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
        <button
          className="button primary block"
          onClick={() => updateProfile({ beername })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
