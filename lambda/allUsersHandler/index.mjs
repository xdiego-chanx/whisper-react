import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

const connection = await mysql.createConnection({
    host: "whisper-react.cpsuieueqy00.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "PublicStaticRubielGOD_11",
    database: "whisper_react"
});

export const handler = async (event) => {

    const auth = event.headers.Authorization || event.headers.authorization;
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, "PublicStaticRubielGOD11");
    const code = decoded.userId;

    try {
        const [rows, fields] = await connection.execute("SELECT * FROM users WHERE CODE != ?", [code]);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Query successful",
                users: rows,
            }),
        };
    } catch (error) {
        console.error("Error querying the database:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error querying the database",
            }),
        };
    }

};
