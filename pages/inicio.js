import { useSession, getSession } from 'next-auth/client'
import LayoutApp from '../components/layoutApp'
import FloatActionButton from '../components/core/floatActionButton'

export default function Inicio() {
  const [ session, loading ] = useSession()

  if (typeof window !== 'undefined' && loading) return null

  if (!session) return <p>Access Denied</p>

  return (
    <LayoutApp>
      <FloatActionButton/>
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
  return {
    props: { session }
  }
}