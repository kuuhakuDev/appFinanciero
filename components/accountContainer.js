import React, { useContext } from 'react'
import FloatActionButton from '../components/core/floatActionButton'
import CuentaItem from '../components/core/cuentaItem'
import {AccountContext} from '../components/context/accounts'
import DataGridCRUD from '../components/core/dataGridCRUD';

const columns = [
  //{ field: 'id', headerName: 'ID', width: 350},
  { 
    field: 'name', 
    headerName: 'Nombre de cuenta', 
    width: 350, 
    renderCell: (params) => (
    <a href={'/cuentas/'+params.getValue('_id')}>{params.getValue('name')}</a>
  ),},
  { 
    field: 'saldo', 
    headerName: 'Saldo de la cuenta', 
    type: 'number', 
    width: 250, },
];

const model = {
  url: '/account',
  data: {
    name: '',
  },
  require: [
    {name: 'name', msg: 'Nombre de la cuenta'}
  ]
}

export default function AccountsContainer(){
  const [ accounts, setAccounts ] = useContext(AccountContext);
  var rows = accounts.map((acc) => {return {...acc, id: acc._id}});

  return (
    <>
      {/* <FloatActionButton/> */}
      <div style={{ height: 450, width: '100%' }}>
        <DataGridCRUD rows={rows} columns={columns} model={model} context={accounts} setContext={setAccounts}/>
      </div>
    </>
  )
}