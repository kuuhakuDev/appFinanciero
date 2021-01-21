import React, { useContext, useEffect } from 'react'
import FloatActionButton from '../components/core/floatActionButton'
import CuentaItem from '../components/core/cuentaItem'
import {AccountContext} from '../components/context/accounts'

  export default function AccountsContainer({reply}){

    const [ accounts, setAccounts ] = useContext(AccountContext);

    useEffect(() => {
        setAccounts(reply)
    })

      return (
          <>
            <FloatActionButton/>
            <CuentaItem accounts={accounts}/>
          </>
      )
  }