import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
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
        const body = JSON.parse(event.body);
        const { userOrEmail, password } = body;

        if (!userOrEmail || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing required fields" })
            };
        }

        const [results] = await connection.query(
            "SELECT * FROM users WHERE user_name = ? OR email = ?",
            [userOrEmail, userOrEmail]
        );

        if (results.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "User not found" })
            };
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.pass_hash);
        if (!isPasswordValid) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Invalid password" })
            };
        }

        const token = jwt.sign({ userId: user.code, userEmail: user.email, username: user.user_name  }, "PublicStaticRubielGOD11", {
            expiresIn: "1h"
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful!", token })
        };

    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" })
        };
    }
};