import mongoose from 'mongoose'
import dbConnect from "../mongoose";
import { getIdbyToken } from '../../api/user/service'

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a userId for this account.'],
        },
    name: {
        type: String,
        required: [true, 'Please provide a name for this account.'],
        maxlength: [25, 'Name cannot be more than 25 characters'],
    },
    saldo: {
        type: Number,
        required: [true, 'Please provide a saldo for this account.'],
    },
})
const Account = mongoose.models.Account_Personal || mongoose.model('Account_Personal', AccountSchema)
export default Account

export async function addAccount(token, data){
  try {
    await dbConnect()
    data.userId = (await getIdbyToken(token)).userId;
    data.saldo = 0;
    const account = await Account.create(data);
    return account;
  } 
  catch (error) {
    throw "Ocurrio un error al intentar crear la cuenta.";
  }
}

export async function getAccounts(token){
  try {
    await dbConnect()
    let userId = (await getIdbyToken(token)).userId;
    const accounts = await Account.find({userId: userId}).exec();
    return accounts;
  } 
  catch (error) {
    throw "Ocurrio un error al intentar crear la cuenta.";
  }
}

export async function editAccount(token, data){
  try {
    await dbConnect()
    var userId = (await getIdbyToken(token)).userId;
    console.log(data);
    const edit = await Account.updateOne({userId: userId, _id: data._id}, data);
    const account = await Account.find({userId: userId, _id: data._id});
    console.log(account);
    console.log("Paso primera prueba");
    return account;
  } 
  catch (error) {
    console.log(error);
    throw "Ocurrio un error al intentar editar la cuenta.";
  }
}

export async function delAccount(token, ids){
  try {
    await dbConnect()
    let userId = (await getIdbyToken(token)).userId;
    console.log(ids);
    const deleted_account = await Account.deleteMany(
      { 
        _id: {
          $in: ids
        }, 
        userId: userId
      });
    console.log(deleted_account);
    return  true;
  } 
  catch (error) {
    throw "Ocurrio un error al intentar eliminar la cuenta.";
  }
}