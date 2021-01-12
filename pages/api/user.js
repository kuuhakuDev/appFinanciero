import { add, getByCookies, update } from "../../util/api/user/service";

export default async (req, res) => {

    var method = req.method;
    switch (method) {
        case "GET":
            let get = await getByCookies(req.body.cookie);
            res.status(get.code).json({
                reply: get.reply,
                error: get.error
            })
            break;
        
        case "POST":
            let post = await add(req.body)
            
            res.status(post.code).json({
                reply: post.reply,
                error: post.error
              });
            break;
        
        case "PUT":
            let data = req.body.data;
            let cookie = req.body.cookie;
            let put = await update(data, cookie);
            //console.log(put);
            res.status(put.code).json({
                reply: put.reply,
                error: put.error,
                msg: put.msg,
              });
            break;
    
        case "DELETE":

            break;
        default:
            break;
    }

  //const { db } = await connectToDatabase();

  var reply = {}
  //reply.userreply = JSON.parse(req.body);
  reply.userdata = {}
  reply.userdata.cookie = req.headers.cookie
  reply.userdata.userAgent = req.headers['user-agent']
  reply.userdata.contentType = req.headers['content-type']
  reply.userdata.lenguage = req.headers['accept-language']

  /* const mercado = await db
  .collection("estudio_mercado")
  .insertOne(reply) */

  console.log(req.method);
}