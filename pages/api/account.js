import { getSession } from 'next-auth/client';
import { addAccount, getAccounts, delAccount } from '../../util/database/model/modelAccounts';
import { StatusCodes }  from 'http-status-codes';

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    // Signed in
    var method = req.method;
    switch (method) {
      case "GET":
        var param = [session.accessToken];
        var property = resProperty(StatusCodes.OK, "Cuentas listadas con exito.");
        await crud(getAccounts, param, property);
        break;
      
      case "POST":
        var param = [session.accessToken, JSON.parse(req.body)];
        var property = resProperty(StatusCodes.CREATED, "La cuenta fue creada con exito.");
        await crud(addAccount, param, property);
        break;
      
      case "PUT":
          
        break;
  
      case "DELETE":
        var param = [session.accessToken, JSON.parse(req.body).idAccount];
        var property = resProperty(StatusCodes.OK, "La cuenta fue eliminada con exito.");
        await crud(delAccount, param, property);
        break;
        
      default:
        break;
    }
  } 
  else {
    // Not Signed in
    res.status(401)
  }

  function resProperty(statusCode, msg){
    return {statusCode: statusCode, msg: msg};
  }

  async function crud(fun, param, property){
    try{
      let account = await fun(...param);
      resManager(property.statusCode, account, property.msg);
    }
    catch(error){
      resManager(StatusCodes.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  function resManager(code, obj, msg){
    res.status(code).json({
      reply : obj,
      msg: msg
    })
  } 

  res.end()
}