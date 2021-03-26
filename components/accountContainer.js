import React, { useContext } from 'react'
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
  api: '/account',
  data: {
    name: '',
  },
  require: [
    {name: 'name', msg: 'Nombre de la cuenta', helper: "25 caracteres como maximo", inputProps: { maxLength: 25 }}
  ]
}

export default function AccountsContainer({data}){

  return (
    <>
      <div style={{ height: 505, width: '100%' }}>
        <DataGridCRUD columns={columns} model={model} data={data}/>
      </div>
    </>
  )
}