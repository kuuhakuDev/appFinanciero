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

export default function ModalCRUD({close, model, setRows, selected, propsModal, setActionDisable}){
  let fields = model.require;
  const { enqueueSnackbar } = useSnackbar();
  const mode = propsModal.mode;

  async function fun(){
    let method =  mode == "Crear"? 'POST':
                  mode == "Editar"? "PUT":
                  "DELETE";

    let propCRUD = {
      method: method,
      model: model,
      setState: setRows,
      selected: selected,
      setActionDisable: setActionDisable,
      enqueueSnackbar: enqueueSnackbar,
    }

    CRUD(propCRUD);
    close();
  }

  const title = mode == "Crear"? "Crear Cuenta":
                mode == "Editar"? "Editar Cuenta":
                mode == "Eliminar"? "Esta seguro que quiere eliminar estos datos?": "";

  return (
    <Modal close={close} open={propsModal.open}>

      <ModalLayout title={title} fun={fun} mode={mode} close={close}>
        {
          mode!="Eliminar"?
          <GetFields fields={fields} model={mode == "Crear"? false: model}/>:
          <></>
        }
          {/* <TextField id="saldo-account-input" label="Saldo inicial de la cuenta" helperText="Solo numeros"
          fullWidth margin="normal" inputProps={{ maxLength: 25 }} InputProps={{inputComponent: NumberFormatCustom,}}/> */}
      </ModalLayout>
    </Modal>
  )
}

function GetFields({fields, model}){

  return(
      fields.map((m, index) => (
        <TextField key={index} id={m.name+'-input'} label={m.msg} helperText={m.helper}
        fullWidth margin="normal" inputProps={m.inputProps} defaultValue={model? model.data[m.name]: ""} />
      ))
  );
}

function ModalLayout({title, children, fun, mode, close}){
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{title}</h2>
      <div>
        {children}
        <Button variant="contained" color={mode=="Eliminar"?"secondary":"primary"} onClick={fun}>{mode}</Button>
        <Button variant="contained" onClick={close}>Cerrar</Button>
      </div>
    </div>
  )
}

function CRUD({method, model, setState, selected, setActionDisable, enqueueSnackbar}){

  var data = null;
  if(method != "DELETE"){
    for (const property in model.data) {
      console.log('#'+ property +'-input');
      model.data[property] = document.querySelector('#'+ property +'-input').value;
    }
    data = {...model.data};
    if(method == "PUT"){
      data._id = selected[0];
    }
  }
  else{
    data = {idAccounts: selected};
  }

  sendDataApi(model.api, method, data)
  .then(res => {
    if(res.data){
      method == "POST"? addEletmetToState(res, setState):
      method == "PUT"? editElementToState(setState, selected, res):
      method == "DELETE"? delElementsToState(setState, selected, setActionDisable): null;
    }
    enqueueSnackbar(res.msg, { variant: res.variant });
  })
}

function addEletmetToState(res, setState){
  res.data.id = res.data._id;
  setState((state) => [...state, res.data]);
}

function delElementsToState(setState, selected, setActionDisable){
  setState((state) => (removeToArray(state)));

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

  setActionDisable({edit: true, delete: true})
}

function editElementToState(setState, selected, res){
  console.log(res.data);
  res.data[0].id = res.data[0]._id;
  console.log(res.data);
  setState((state) => (editToArray(state)));

  function editToArray(state){
    var newRows = [];
    for (let i = 0; i < state.length; i++) {
      var go = true;
      const con = state[i];
      for (let j = 0; j < selected.length && go; j++) {
        const sel = selected[j];
        if(con._id == sel) go = false;
      }
      newRows.push(go? con: res.data[0]);
    }
    return newRows
  }
}