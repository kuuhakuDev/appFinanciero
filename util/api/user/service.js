import { connectToDatabase } from "../../mongodb";
import token from "../../token"
import crypto from "../../crypto"
import {reply} from "../reply"

const model = ["Nombre", "Email", "Password"];

function verifyModel(req){
    let passed = true
    model.forEach(function(val, idx, array) {
        let position = req.indexOf(val);
        if(position == -1){
            passed = false;
        }
      });
    return passed;
}

function verifyPass(hash, pass){
    return hash == crypto(pass)
}

export async function add(user){

    if(!verifyModel(Object.getOwnPropertyNames(user).sort())){
        reply.code = 400;
        reply.error[0] = true;
        reply.error[1] = "Usuario introducido de manera incorrecta";

        return reply;
    }

    let name = user["Nombre"];
    let pass = user["Password"];

    if(name.length > 3 && name.length < 25){
        if(pass.length > 6 && pass.length < 25){
            
            let userCreated = {
                Nombre: user["Nombre"],
                Email: user["Email"],
                Password: await crypto(user["Password"]),
                Cookies: [token()]
            }
            
            const { db } = await connectToDatabase();

            const query = await db
            .collection("users_dev")
            .insertOne(userCreated);

            reply.reply = userCreated;
            return reply;
        }
    }
}

export async function getByCookies(cookie){
    const { db } = await connectToDatabase();

    const query = await db
    .collection("users_dev")
    .findOne(
        {Cookies: cookie}, 
        {projection: {_id: 0, Password: 0, Cookies: 0}}
    );

    reply.reply = query;
    return reply;
}

export async function update(user, cookie){

    let myquery = {Cookies: cookie};
    let newvalues = {$set: {}};
    let passed = false

    for(let property in user){
        let position = model.indexOf(property);
        if(position != -1){
            passed = true;
            newvalues
            .$set[property] = property == "Password"? crypto(user[property]): user[property];
        }
    }

    if(passed){
        const { db } = await connectToDatabase();
        
        var resUser = await db
        .collection("users_dev")
        .findOne(
            {Cookies: cookie}, 
            {projection: {Cookies: 0}}
        );
        if(resUser == null){
            reply.code = 404;
            reply.error = [true, "Usuario no encontrado"];
            return reply;
        }
        
        if(verifyPass(resUser.Password, user.CurrentPass)){
            var res = await db
            .collection("users_dev")
            .updateOne(myquery, newvalues);

            reply.msg = "Se ha modificado "+ res.result.nModified +" usuario."
            return reply;
        }
        else{
            reply.code = 400;
            reply.error = [true, "La contraseña es incorrecta."];
            return reply;
        }
        
    }
    else{ console.log("No hay campos para actualizar")}
}