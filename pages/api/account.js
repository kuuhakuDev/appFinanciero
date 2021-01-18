import { getSession } from 'next-auth/client'
import { add, get } from '../../util/api/cuentas/service'

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
                error: post.error
              });
            break;
        
        case "PUT":
            
          break;
    
        case "DELETE":

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