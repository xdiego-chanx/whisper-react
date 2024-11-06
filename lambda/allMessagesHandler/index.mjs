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
        // Extract JWT token from the Authorization header
        const auth = event.headers.Authorization || event.headers.authorization;
        const token = auth.split(" ")[1];

        // Verify JWT and extract the userId (user1)
        const decoded = jwt.verify(token, "PublicStaticRubielGOD11");
        const user1 = decoded.userId;

        // Extract user2 code from the path parameters
        const user2 = event.pathParameters.code;

        // SQL Query to fetch messages between user1 and user2
        const [rows, fields] = await connection.execute(`
            SELECT * 
            FROM \`messages\`
            WHERE (
                user_from = (SELECT id FROM \`users\` WHERE code = ?)
                AND user_to = (SELECT id FROM \`users\` WHERE code = ?)
            )
            OR (
                user_from = (SELECT id FROM \`users\` WHERE code = ?)
                AND user_to = (SELECT id FROM \`users\` WHERE code = ?)
            );
        `, [user1, user2, user2, user1]);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Messages retrieved successfully",
                messages: rows
            }),
        };

    } catch (error) {
        console.error("Error retrieving messages:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error retrieving messages",
                error: error.message,
            }),
        };
    }
};
