import { useSession, getSession } from 'next-auth/client'
import LayoutApp from '../components/layoutApp'
import AccountsProvider, {AccountContext} from '../components/context/accounts'
import AccountsContainer from '../components/accountContainer'

import { get } from '../util/api/cuentas/service'

export default function Cuentas({reply}) {
  
  const [ session, loading ] = useSession();

  if (typeof window !== 'undefined' && loading) return null

  if (!session) return <p>Access Denied</p>

  return (
    <LayoutApp>
      <AccountsProvider value={reply}>
        <AccountsContainer /* reply={reply} *//>
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

  let response = JSON.parse(JSON.stringify((await get(session.accessToken)))).reply;
  //response = (typeof response.reply == 'object')? [response.reply]: response.reply;
  console.log(typeof response)
  console.log(response)

  return {
    props: { session, reply: response }
  }
}