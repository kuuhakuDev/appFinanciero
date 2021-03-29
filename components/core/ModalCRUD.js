import React from 'react'
//import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Modal from './Modal'
import { useSnackbar } from 'notistack';
import { sendDataApi } from '../../util/api/apiManager'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));

// function NumberFormatCustom(props) {
//     const { inputRef, onChange, ...other } = props;

//     return (
//       <NumberFormat {...other} getInputRef={inputRef}  thousandSeparator isNumericString prefix=""
//       onValueChange={(values) => {onChange({
//             target: {
//               name: props.name,
//               value: values.value,
//             },
//           });
//         }}
//       />
//     );
//   }

export default function modalNew({close, model, setRows, selected, propsModal, value}){

  return (
    <Modal close={close} open={propsModal.open}>
      {
        (propsModal.mode == 'Crear')?
          <AddModal model={model} mode={propsModal.mode} close={close} setState={setRows}/>:
        (propsModal.mode == 'Eliminar')?
          <DelModal model={model} mode={propsModal.mode} close={close} setState={setRows} selected={selected}/>:
          <EditModal model={model} mode={propsModal.mode} close={close} setState={setRows} />
      }
    </Modal>
  )
}

function AddModal ({ model, mode, close, setState }){
  let fields = model.require;

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { enqueueSnackbar } = useSnackbar();

  async function add(){

    for (const property in model.data) {
      model.data[property] = document.querySelector('#'+ property +'-input').value;
    }

    let method = 'POST';
    sendDataApi(model.api, method, model.data)
    .then(res => {
      if(res.data){
        res.data.id = res.data._id;
        setState((state) => [...state, res.data]);
      }
      enqueueSnackbar(res.msg, { variant: res.variant });
    })
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Crear cuenta</h2>
      <div>
        {
          fields.map((m, index) => (
            <TextField key={index} id={m.name+'-input'} label={m.msg}
            helperText={m.helper} fullWidth margin="normal" inputProps={m.inputProps}/>
          ))
        }
        {/* <TextField id="saldo-account-input" label="Saldo inicial de la cuenta" helperText="Solo numeros"
        fullWidth margin="normal" inputProps={{ maxLength: 25 }} InputProps={{inputComponent: NumberFormatCustom,}}/> */}

        <Button variant="contained" color="primary" onClick={add}>{mode}</Button>
        <Button variant="contained" onClick={close}>Cerrar</Button>
      </div>
    </div>
  );
}

function EditModal ({ model, mode, close, setState }){
  let fields = model.require;

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { enqueueSnackbar } = useSnackbar();

  async function edit(){

    for (const property in model.data) {
      model.data[property] = document.querySelector('#'+ property +'-input').value;
    }

    let method = 'POST';
    sendDataApi(model.api, method, model.data)
    .then(res => {
      if(res.data){
        res.data.id = res.data._id;
        setState((state) => [...state, res.data]);
      }
      enqueueSnackbar(res.msg, { variant: res.variant });
    })
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Editar cuenta</h2>
      <div>
        {
          fields.map((m, index) => (
            <TextField key={index} id={m.name+'-input'} label={m.msg} helperText={m.helper}
            fullWidth margin="normal" inputProps={m.inputProps} value={model.data[m.name]}/>
          ))
        }
        {/* <TextField id="saldo-account-input" label="Saldo inicial de la cuenta" helperText="Solo numeros"
        fullWidth margin="normal" inputProps={{ maxLength: 25 }} InputProps={{inputComponent: NumberFormatCustom,}}/> */}

        <Button variant="contained" color="primary" onClick={edit}>{mode}</Button>
        <Button variant="contained" onClick={close}>Cerrar</Button>
      </div>
    </div>
  );
}

function DelModal ({ model, mode, close, setState, selected }){

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { enqueueSnackbar } = useSnackbar();

  function removeToArray(state){
    var newRows = [];
    for (let i = 0; i < state.length; i++) {
      const con = state[i];
      var go = true;
      for (let j = 0; j < selected.length && go; j++) {
        const sel = selected[j];
        if(con._id == sel) go = false;
      }
      if(go) newRows.push(con);
    }
    return newRows
  }

  function del(){
    var method = "DELETE";
    var data = {idAccounts: selected};

    sendDataApi(model.api, method, data)
    .then(res => {
      console.log(res);
      if(res.data) {
        setState((state) => (removeToArray(state)));
      }
      enqueueSnackbar(res.msg, { variant: res.variant });
    })
    close();
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Esta seguro que quiere eliminar estos datos?</h2>
      <div>
        <Button variant="contained" color="secondary" onClick={del}>{mode}</Button>
        <Button variant="contained" onClick={close}>Cerrar</Button>
      </div>
    </div>
  );
}