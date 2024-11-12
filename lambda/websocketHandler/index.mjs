import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

const sendMessage = async () => {
    
}

const connection = await mysql.createConnection({
    host: "whisper-react.cpsuieueqy00.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "PublicStaticRubielGOD_11",
    database: "whisper_react"
});


export const handler = async (event) => {

    if(event.requestContext) {
        const key = event.requestContext.routeKey;

        switch(key) {
            case "$connect":
                break;
            case "$disconnect":
                break;
            case "$default": 
                break;
            case "sendMessage":
                await sendMessage();
        }

        await connection.execute("INSERT INTO log (messages) VALUES ?", [`Route accessed: ${key}`]);
    }
};
