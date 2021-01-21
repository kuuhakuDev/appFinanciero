import React, { useContext } from 'react'
import FloatActionButton from '../components/core/floatActionButton'
import CuentaItem from '../components/core/cuentaItem'
import {AccountContext} from '../components/context/accounts'

  export default function AccountsContainer(){

    const [ accounts, setAccounts ] = useContext(AccountContext);

      return (
          <>
            <FloatActionButton/>
            <CuentaItem accounts={accounts}/>
          </>
      )
  }