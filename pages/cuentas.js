import { useSession, getSession } from 'next-auth/client'
import LayoutApp from '../components/layoutApp'
import AccountsProvider from '../components/context/accounts'
import AccountsContainer from '../components/accountContainer'

import { get } from '../util/api/cuentas/service'

export default function Cuentas({reply}) {
  
  const [ session, loading ] = useSession();

  if (typeof window !== 'undefined' && loading) return null

  if (!session) return <p>Access Denied</p>

  return (
    <LayoutApp>
      <AccountsProvider>
        <AccountsContainer reply={reply}/>
      </AccountsProvider>
    </LayoutApp>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(!session){
    return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  }

  let reply = JSON.parse(JSON.stringify((await get(session.accessToken)).reply));

  return {
    props: { session, reply: reply }
  }
}