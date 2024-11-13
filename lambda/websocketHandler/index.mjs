import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";

const connection = await mysql.createConnection({
    host: "whisper-react.cpsuieueqy00.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "PublicStaticRubielGOD_11",
    database: "whisper_react"
});

const mgr = new AWS.ApiGatewayManagementApi({
    endpoint: "https://2k9ligtz1d.execute-api.us-east-2.amazonaws.com/production"
});

const getUserId = (token) => {
    const decoded = jwt.verify(token, "PublicStaticRubielGOD11");
    const code = decoded.userId;
    return code;
}

const sendMessage = async (body) => {
    const { code, content, headers } = body;
    const auth = headers.Authorization || headers.authorization;
    const token = auth.split(" ")[1];
    const from = getUserId(token);

    const [[row]] = await connection.execute(
        "SELECT connection_id FROM users WHERE code = ?",
        [code]
    );

    const recipientConnId = row?.connectionId;

    await connection.execute(`INSERT INTO messages(user_from, user_to, content) VALUES (
        (SELECT id FROM users WHERE code = ?),
       (SELECT id FROM users WHERE code = ?),
        ?
    )`, [from, code, content]);
    
    const [rows, fields] = await connection.execute(
        `SELECT * FROM messages WHERE ID = LAST_INSERT_ID()`
    );

    const insertedMessage = rows[0]
    try {
        mgr.postToConnection({
            ConnectionId: recipientConnId,
            Data: JSON.stringify({
                messages: insertedMessage
            }),
        });
    } catch (err) {
        console.error("Error sending message to recipient:", err);
        return { statusCode: 500, body: "Failed to send message to recipient" };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: insertedMessage
        })
    };
    
}

export const handler = async (event) => {

    if (event.requestContext) {
        const key = event.requestContext.routeKey;

        switch (key) {
            case "$connect":
                const connectId = event.requestContext.connectionId;
                const token = event.queryStringParameters?.code || "";
                if (!token) {
                    return { statusCode: 400, body: "Missing 'code' in connection request" };
                }

                const code = getUserId(token);
                await connection.execute(`UPDATE users SET connection_id = ? WHERE code = ?`, [connectId, code]);

                return { statusCode: 200, body: "Connection established" };
            case "$disconnect":
                const disconnectId = event.requestContext.connectionId;
                await connection.execute("UPDATE users SET connection_id = NULL WHERE connection_id = ?", [disconnectId]);

                return { statusCode: 200, body: "Disconnected" };
            case "$default":
                return { statusCode: 400, body: "Invalid route" };
            case "sendMessage":
                const body = JSON.parse(event.body);
                const message = await sendMessage(body);
                return message; 
        }

        await connection.execute("INSERT INTO log (message) VALUES (?)", [`Route accessed: ${key}`]);
    }
}; 