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

export async function delAccount(token, id){
  try {
    await dbConnect()
    let userId = (await getIdbyToken(token)).userId;
    const deleted_account = await Account.deleteOne({_id: id, userId: userId});
    return  {deleted: true};
  } 
  catch (error) {
    throw "Ocurrio un error al intentar eliminar la cuenta.";
  }
}