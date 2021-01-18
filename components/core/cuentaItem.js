import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
    const classes = useStyles();
    const title = props.title;
    const saldo = props.saldo;
    const pos = (saldo >= 0)? true: false;
    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Paper className={classes.paper} elevation={1}>
                <Paper className={classes.item} elevation={3}>
                    <Typography variant="subtitle1" noWrap className={classes.title} align="center">{title}</Typography>
                </Paper>
                <Typography className={classes.saldo} variant="subtitle2" noWrap align="center">Saldo:</Typography>
                <Typography className={pos? classes.valorPos: classes.valorNeg} variant="h5" noWrap align="center">C$ {saldo}</Typography>
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
                        <CuentaItem key={index} title={item.name} saldo={item.saldo}/>
                    )
                }
        </Grid>
    )
}