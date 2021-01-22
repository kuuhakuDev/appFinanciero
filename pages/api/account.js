import { getSession } from 'next-auth/client'
import { add, get, del } from '../../util/api/cuentas/service'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    // Signed in
    var method = req.method;
    switch (method) {
        case "GET":
            let get = await get(session.accessToken)
            console.log(get)
            res.status(get.code).json({
              reply: get.reply,
              error: get.error
            });
            break;
        
        case "POST":
          let post = await add(session.accessToken, JSON.parse(req.body))
          //console.log(post)
          res.status(post.code).json({
              reply: post.reply,
              type: post.type,
              msg: post.msg,
            });
          break;
        
        case "PUT":
            
          break;
    
        case "DELETE":
          let deleted = await del(session.accessToken, JSON.parse(req.body).idAccount)
          //console.log(deleted)
          res.status(deleted.code).json({
            reply: deleted.reply,
            type: deleted.type,
            msg: deleted.msg,
          });
          break;
        default:
            break;
    }
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}