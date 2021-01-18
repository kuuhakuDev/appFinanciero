import dbConnect from "../../mongoose";
import Account from './model'
import { getIdbyToken } from '../user/service'
import {reply} from "../reply"

export async function add(token, data){    

  try {
      await dbConnect()
      data.userId = (await getIdbyToken(token)).userId;
      const account = await Account.create(
        data
      ) /* create a new model in the database */
      console.log("Agregado: " + account)
      reply.reply = account;
      reply.msg = "Cuenta creada con exito."
      return reply
    } catch (error) {
      console.log("No se pudo por no se que: " + error)
      reply.msg = "Ocurrio un error al intentar crear la cuenta."
      return reply
    }
}

export async function get(token){    

  try {
      await dbConnect()
      let userId = (await getIdbyToken(token)).userId;
      const accounts = await Account.find({userId: userId}).exec(); /* create a new model in the database */
      console.log("Lista generada: \n" + accounts)
      reply.reply = accounts;
      reply.msg = "Cuentas obtenidas con exito."
      return reply
    } catch (error) {
      console.log("No se pudo por no se que: " + error)
      reply.msg = "Ocurrio un error al intentar crear la cuenta."
      return reply
    }
}