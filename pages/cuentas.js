import { getAccounts } from '../util/database/model/modelAccounts'
import LayoutApp from '../components/layoutApp'
import AccountsProvider from '../components/context/accounts'
import AccountsContainer from '../components/accountContainer'
import { useSession, getSession } from 'next-auth/client'
import { SnackbarProvider } from 'notistack';

export default function Cuentas({reply}) {
  
  const [ session, loading ] = useSession();

  if (typeof window !== 'undefined' && loading) return null

  if (!session) return <p>Access Denied</p>

  return (
    <SnackbarProvider maxSnack={3}>
      <LayoutApp title="Cuentas" avatar={session.user.image}>
        <AccountsProvider value={reply}>
          <AccountsContainer/>
        </AccountsProvider>
      </LayoutApp>
    </SnackbarProvider>
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

  let response = JSON.parse(JSON.stringify((await getAccounts(session.accessToken))));

  return {
    props: { session, reply: response }
  }
}