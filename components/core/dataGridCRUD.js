import React, { useState } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function dataGridCRUD({rows, columns}){

  const [selected, setSelected] = useState([]);
  const [enableEdit, setEnableEdit] = useState(true);
  const [enableDelete, setEnableDelete] = useState(true);

  function select(selection){
    var modelSelected = selection.selectionModel
    setSelected(modelSelected);
    setEnableEdit((modelSelected.length != 1));
    setEnableDelete((modelSelected.length < 1))
  }

  function ActionBar(){
    return (
      <Grid container justify="space-between">
        <Grid xs={12} md={6}>
          <GridToolbar/>
        </Grid>
        <Grid>
          <IconButton aria-label="edit" disabled={enableEdit}>
            {
              enableEdit? <EditIcon color={'disabled'}/>
              : <EditIcon style={{color: '#080'}}/>
            }
          </IconButton>
          <IconButton aria-label="delete" disabled={enableDelete}>
            <DeleteIcon color={enableDelete? 'disabled': 'error'}/>
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  return (
      <>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection  
        onSelectionModelChange={select} components={{ Toolbar: ActionBar, }} />
      </>
  )
}