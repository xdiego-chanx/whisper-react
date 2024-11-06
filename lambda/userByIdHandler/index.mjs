import mysql from "mysql2/promise";

// Create a MySQL connection
const connection = await mysql.createConnection({
    host: "whisper-reactr.cpsuieueqy00.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "PublicStaticRubielGOD_11",
    database: "whisper_react"
});

// Lambda function handler
export const handler = async (event) => {
    const code = event.pathParameters.code;

    try {
        const [rows] = await connection.execute("SELECT * FROM users WHERE code = ?", [code]);

        if (rows.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "User not found" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(rows[0])
        };

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};
