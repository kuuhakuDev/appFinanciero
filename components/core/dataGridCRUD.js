import React, { useState } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ModalCRUD from './ModalCRUD';

const useStyles = makeStyles((theme) => ({
  button:{
    margin: '.5rem'
  }
}));

export default function dataGridCRUD({columns, model, data}){
  const classes = useStyles();

  const [rows, setRows] = useState(data.map((element) => {return {...element, id: element._id}}));
  const [selected, setSelected] = useState([]);
  const [actionDisable, setActionDisable] = useState({edit: true, delete: true});
  const [propsModal, setPropsModal] = useState({open: false, mode: ''});

  const handleOpen = () => {
    setPropsModal((modal) => ({open: true, mode: modal.mode}));
  };

  const handleClose = () => {
    setPropsModal((modal) => ({open: false, mode: modal.mode}));
  };
  

  function selectRow(selection){
    var modelSelected = selection.selectionModel
    setSelected(modelSelected);
    setActionDisable({
      edit: (modelSelected.length != 1),
      delete: (modelSelected.length < 1)
    })
  }

  function dataCreate(){
    setPropsModal((modal) => ({open: modal.open, mode: 'Crear'}));
    handleOpen();
  }

  function dataDelete(){
    setPropsModal((modal) => ({open: modal.open, mode: 'Eliminar'}));
    handleOpen();
  }

  function dataEdit(){
    let row = rows.find((r) => r.id == selected[0]);
    for (const property in model.data) {
      model.data[property] = row[property];
    }

    setPropsModal((modal) => ({open: modal.open, mode: 'Editar'}));
    handleOpen();
  }

  const ToolBar = React.memo(GridToolbar);

  function ActionBar(){
    return (
      <Grid container justify="space-between">
        <Grid className={classes.button} xs={12} md={6}>
          <ToolBar/>
        </Grid>
        <Grid>
          <AcctionButton text='Crear' icon={AddIcon} color='primary' fun={dataCreate}/>
          <AcctionButton text='Editar' icon={EditIcon} color='inherit' enabled={actionDisable.edit} fun={dataEdit}/>
          <AcctionButton text='Eliminar' icon={DeleteIcon} color='secondary'enabled={actionDisable.delete} fun={dataDelete}/>
        </Grid>
      </Grid>
    )
  }

  return (
      <>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection  
        onSelectionModelChange={selectRow} components={{ Toolbar: ActionBar, }} disableColumnResize={false}/>

        <ModalCRUD close={handleClose} model={model}  selected={selected} 
                  propsModal={propsModal} setRows={setRows}/>
      </>
  )
}

  const AcctionButton = React.memo((props) => {
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
})