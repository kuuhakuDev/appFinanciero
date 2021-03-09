import { getSession } from 'next-auth/client';
import { add, getAccounts, del } from '../../util/database/model/modelAccounts';
import { StatusCodes }  from 'http-status-codes';

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    // Signed in
    var method = req.method;
    switch (method) {
      case "GET":
        try{
          let Accounts = await getAccounts(session.accessToken);
          resManager(StatusCodes.OK, Accounts, "Cuentas listadas con exito.");
        }
        catch(error){
          resManager(StatusCodes.INTERNAL_SERVER_ERROR, null, error);
        }
        break;
      
      case "POST":
        try{
          let account = await add(session.accessToken, JSON.parse(req.body));
          resManager(StatusCodes.CREATED, account, "La cuenta fue creada con exito!");
        }
        catch(error){
          resManager(StatusCodes.INTERNAL_SERVER_ERROR, null, error);
        }
        break;
      
      case "PUT":
          
        break;
  
      case "DELETE":
        try{
          let deleted = await del(session.accessToken, JSON.parse(req.body).idAccount)
          resManager(StatusCodes.OK, deleted, "La cuenta fue eliminada con exito.");
        }
        catch(error){
          resManager(StatusCodes.INTERNAL_SERVER_ERROR, null, error);
        }
        break;
      default:
        break;
    }
  } 
  else {
    // Not Signed in
    res.status(401)
  }

  function resManager(code, obj, msg){
    res.status(code).json({
      reply : obj,
      msg: msg
    })
  } 

  res.end()
}