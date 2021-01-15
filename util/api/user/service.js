import { connectToDatabase } from "../../mongodb";
import {reply} from "../reply"

export async function getIdbyToken(token){
    const { db } = await connectToDatabase();

    return await db
    .collection("sessions")
    .findOne(
        {accessToken: token}, 
        {projection: {_id: 0, expires: 0, sessionToken: 0, accessToken: 0, createdAt: 0, updatedAt: 0,}}
    );
}