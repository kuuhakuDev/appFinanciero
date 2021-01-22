import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from './menuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AccountContext } from '../context/accounts';
import { useSnackbar } from 'notistack';

//Estilos
const useStyles = makeStyles((theme) => ({
    paper: {
        //width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(2, 3, 3),
      },
    item: {
        //width: 400,
        backgroundColor: "#006bbb",
        //boxShadow: theme.shadows[5],
        margin: theme.spacing(-3, 2, 2),
        padding: theme.spacing(1),
    },
    title: {
        color: theme.palette.background.default
    },
    saldo: {
        color: theme.palette.text.secondary,
    },
    valorPos: {
        color: theme.palette.success.dark,
        fontWeight: theme.typography.fontWeightBold
    },
    valorNeg: {
        color: theme.palette.error.dark,
        fontWeight: theme.typography.fontWeightBold
    }
}));

function CuentaItem(props){
    const [accounts, setAccounts] = useContext(AccountContext);
    const { enqueueSnackbar } = useSnackbar();

    const classes = useStyles();
    const title = props.title;
    const saldo = props.saldo;
    const pos = (saldo >= 0)? true: false;

    function edit(){
        console.log("Me estoy editando :3")
    }

    async function del(){
      fetch("http://localhost:3000/api/account", {
        method: 'DELETE', // or 'PUT'
        body: JSON.stringify({idAccount: props.idAccount}),
      }).then(res => res.json())
      .catch(error => {
        console.error('Error:', error)
        enqueueSnackbar(response.msg, { variant: 'error' });
      })
      .then(response => {
        if(response.reply.deleted){
            let acc = [];
            accounts.forEach(element => {if(element._id != props.idAccount)acc.push(element)});
            setAccounts(acc)
            enqueueSnackbar(response.msg, { variant: response.type });
        }
      });
    }

    const options = [
        {op: "Editar", fun: edit},
        {op: "Eliminar", fun: del},
    ]

    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Paper className={classes.paper} elevation={1}>
                <Paper className={classes.item} elevation={3}>
                    <Typography variant="subtitle1" noWrap className={classes.title} align="center">{title}</Typography>
                </Paper>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography className={classes.saldo} variant="subtitle2" noWrap align="center">Saldo:</Typography>
                        <Typography className={pos? classes.valorPos: classes.valorNeg} variant="h5" noWrap align="center">C$ {saldo}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <MenuItem options={options}/>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default function CuentasContainer(props){
    const items = props.accounts
    
    return (
        <Grid container xs={12} spacing={3}>
                {
                    items.map((item, index) =>
                        <CuentaItem key={index} idAccount={item._id} title={item.name} saldo={item.saldo}/>
                    )
                }
        </Grid>
    )
}