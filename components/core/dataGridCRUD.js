import React, { useState } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { sendDataApi } from '../../util/api/apiManager'

const useStyles = makeStyles((theme) => ({
  button:{
    margin: '.5rem'
  }
}));

export default function dataGridCRUD({rows, columns, model, context, setContext}){
  const classes = useStyles();

  const [selected, setSelected] = useState([]);
  const [disableEdit, setDisableEdit] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [disableDelete, setDisableDelete] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  function select(selection){
    var modelSelected = selection.selectionModel
    setSelected(modelSelected);
    setDisableEdit((modelSelected.length != 1));
    setDisableDelete((modelSelected.length < 1))
  }

  function dataDelete(){
    setLoadingData(true);
    setDisableDelete(true);
    setDisableEdit(true);

    var api = "/account";
    var method = "DELETE";
    var data = {idAccounts: selected};

    sendDataApi(api, method, data)
    .then(res => {
      console.log(res);
      if(res.data) {
        var newContext = [];
        for (let i = 0; i < context.length; i++) {
          const con = context[i];
          var go = true;
          for (let j = 0; j < selected.length && go; j++) {
            const sel = selected[j];
            if(con._id == sel) go = false;
          }
          if(go) newContext.push(con);
        }
        setContext([...newContext]);
      }
      enqueueSnackbar(res.msg, { variant: res.variant });
      setLoadingData(false);
    })
    
  }

  function ActionBar(){
    return (
      <Grid container justify="space-between">
        <Grid className={classes.button} xs={12} md={6}>
          <GridToolbar/>
        </Grid>
        <Grid>
          <AcctionButton text='Crear' icon={AddIcon} color='primary' enabled={loadingData}/>
          <AcctionButton text='Editar' icon={EditIcon} color='inherit' enabled={disableEdit}/>
          <AcctionButton text='Eliminar' icon={DeleteIcon} color='secondary'enabled={disableDelete} fun={dataDelete}/>
        </Grid>
      </Grid>
    )
  }

  return (
      <>
        <DataGrid rows={loadingData? []: rows} columns={columns} pageSize={10} checkboxSelection  
        onSelectionModelChange={select} components={{ Toolbar: ActionBar, }} 
        disableSelectionOnClick={loadingData} loading={loadingData} disableColumnResize={false}/>
      </>
  )
}

function AcctionButton(props){
  const classes = useStyles();

  let fun = props.fun;
  let text = props.text;
  let Icon = props.icon;
  let color = props.color;
  let enabled = props.enabled;
  return(
    <Button 
      onClick={fun}
      className={classes.button}
      size={'small'}
      color={color}
      disabled={enabled}
      startIcon={<Icon />}
    >
      {text}
    </Button>
  )
}