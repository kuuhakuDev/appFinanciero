import { getSession } from 'next-auth/client'
import { add } from '../../util/api/cuentas/service'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    // Signed in
    var method = req.method;
    switch (method) {
        case "GET":

            break;
        
        case "POST":
            let post = await add(session.accessToken, JSON.parse(req.body))
            console.log(post)
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