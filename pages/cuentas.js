import { useSession, getSession } from 'next-auth/client'
import LayoutApp from '../components/layoutApp'
import FloatActionButton from '../components/core/floatActionButton'
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button'
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
      <NumberFormat {...other} getInputRef={inputRef}  thousandSeparator isNumericString prefix="C$"
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


export default function Cuentas() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle); 
  const [ session, loading ] = useSession()

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Crear cuenta</h2>
      <div>
        <TextField id="standard-full-width" label="Nombre de la cuenta"
        helperText="25 caracteres como maximo" fullWidth margin="normal" inputProps={{ maxLength: 25 }}/>

        <TextField id="standard-full-width" label="Saldo inicial de la cuenta" helperText="Solo numeros"
        fullWidth margin="normal" inputProps={{ maxLength: 25 }} InputProps={{inputComponent: NumberFormatCustom,}}/>

        <Button variant="contained" color="primary">Crear</Button>
      </div>
    </div>
  );

  if (typeof window !== 'undefined' && loading) return null

  if (!session) return <p>Access Denied</p>

  return (
    <LayoutApp>
      <FloatActionButton bodyModal={bodyModal}/>
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
  return {
    props: { session }
  }
}