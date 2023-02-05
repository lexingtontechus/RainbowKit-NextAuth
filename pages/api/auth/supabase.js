import {
  createServerSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';

import Link from 'next/link';

export default function Profile({ user }) {
  return (
    <>
      <p>
        [<Link href="/">Home</Link>] | [
        <Link href="/protected-page">server-side RLS</Link>]
      </p>
      <div>Hello {user.email}</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}
export const getServerSideProps = async ctx => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }

  return {
    props: {
      initialSession: session,
      user: session.user
    }
  }
}
