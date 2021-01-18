import { useSession, getSession } from 'next-auth/client'
import LayoutApp from '../components/layoutApp'
import FloatActionButton from '../components/core/floatActionButton'
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CuentaItem from '../components/core/cuentaItem'

import { get } from '../util/api/cuentas/service'

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

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat {...other} getInputRef={inputRef}  thousandSeparator isNumericString prefix=""
      onValueChange={(values) => {onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
      />
    );
  }


export default function Cuentas({reply}) {
  
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle); 
  const [ session, loading ] = useSession()
  const [ accounts, setAccounts ] = React.useState(reply)

  function sendData(){
    let nameAccount = document.querySelector('#name-account-input').value
    let saldoAccount = parseFloat(document.querySelector('#saldo-account-input').value.replaceAll(',', ''))
    //Pruebas
    fetch("http://localhost:3000/api/account", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({name: nameAccount, saldo: saldoAccount}), // data can be `string` or {object}!
      /* headers:{
        'Content-Type': 'application/json'
      } */
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      let acc = [];
      accounts.forEach(element => {
        acc.push(element);
      });
      acc.push(response.reply);
      setAccounts(acc);
    });
  }

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Crear cuenta</h2>
      <div>
        <TextField id="name-account-input" label="Nombre de la cuenta"
        helperText="25 caracteres como maximo" fullWidth margin="normal" inputProps={{ maxLength: 25 }}/>

        <TextField id="saldo-account-input" label="Saldo inicial de la cuenta" helperText="Solo numeros"
        fullWidth margin="normal" inputProps={{ maxLength: 25 }} InputProps={{inputComponent: NumberFormatCustom,}}/>

        <Button variant="contained" color="primary" onClick={sendData}>Crear</Button>
      </div>
    </div>
  );

  if (typeof window !== 'undefined' && loading) return null

  if (!session) return <p>Access Denied</p>

  return (
    <LayoutApp>
      <FloatActionButton bodyModal={bodyModal}/>
      <CuentaItem accounts={accounts}/>
    </LayoutApp>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(!session){
    return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  }

  let reply = JSON.parse(JSON.stringify((await get(session.accessToken)).reply));

  return {
    props: { session, reply: reply }
  }
}