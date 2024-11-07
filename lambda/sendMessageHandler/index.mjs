import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

const connection = await mysql.createConnection({
    host: "whisper-reactr.cpsuieueqy00.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "PublicStaticRubielGOD_11",
    database: "whisper_react"
});

export const handler = async (event) => {
    try {
        const message = JSON.parse(event.body);
        const {action, code, content, headers} = message;

        const auth = headers.Authorization || headers.authorization;
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, "PublicStaticRubielGOD11");
        const user1 = decoded.userId;

        const user2 = code;

        const [rows, fields] = await connection.execute(`
            INSERT INTO messages 
            (
                user_from,
                user_to,
                content
            ) VALUES (
                (SELECT id FROM users WHERE code = ?),
                (SELECT id FROM users WHERE code = ?),
                ?
            )
        `, [user1, user2, content]);

        return {
            statusCode: 200,
            body: JSON.stringify({
                user_from: user1,
                user_to: user2,
                content: content
            }),
        };

    } catch (error) {
        console.error("Error sending message:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error sending messages",
                error: error.message,
            }),
        };
    }
};
