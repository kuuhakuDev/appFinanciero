import React, { useContext }from 'react'
//import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Modal from '../../core/Modal'
import {AccountContext} from '../../context/accounts'
import { useSnackbar } from 'notistack';
import { sendDataApi } from '../../../util/api/apiManager'

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

export default function modalNew(props){
    
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle); 
    const [ accounts, setAccounts ] = useContext(AccountContext);
    const { enqueueSnackbar } = useSnackbar();

    async function sendData(){
        let nameAccount = document.querySelector('#name-account-input').value
        
        var api = "/account";
        var method = "POST";
        var data = {name: nameAccount/* , saldo: saldoAccount */};

        sendDataApi(api, method, data)
        .then(res => {
          console.log(res);
          if(res.data) setAccounts([...accounts, res.data]);
          enqueueSnackbar(res.msg, { variant: res.variant });
        })
        props.close();
    }

    const bodyModal = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Crear cuenta</h2>
          <div>
            <TextField id="name-account-input" label="Nombre de la cuenta"
            helperText="25 caracteres como maximo" fullWidth margin="normal" inputProps={{ maxLength: 25 }}/>
    
            {/* <TextField id="saldo-account-input" label="Saldo inicial de la cuenta" helperText="Solo numeros"
            fullWidth margin="normal" inputProps={{ maxLength: 25 }} InputProps={{inputComponent: NumberFormatCustom,}}/> */}
    
            <Button variant="contained" color="primary" onClick={sendData}>Crear</Button>
          </div>
        </div>
      );

    return (
        <Modal close={props.close} open={props.open}>
            {bodyModal}
        </Modal>
    )
}