import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "whisper-react.cpsuieueqy00.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "PublicStaticRubielGOD_11",
    database: "whisper_react"
});

export const handler = async (event) => {

    try {
        const [rows, fields] = await connection.execute("SELECT * FROM users");

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