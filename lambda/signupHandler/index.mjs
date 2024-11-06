import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { v4 as uuid4 } from "uuid";

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
        const { username, email, password } = body;

        if(!username || !email || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required fields' }),        
            }
        }

        const [emailResults, emailFields] = await connection.query("SELECT 1 FROM `users` WHERE email = ?", [email]);

        void emailFields; //disable ESLint 'unused' warning;

        if(emailResults.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Email already in use' }),        
            }  
        }

        const code = uuid4();
        const passwordHash = await bcrypt.hash(password, 10); // 10 salt rounds

        await connection.query("INSERT INTO `users` (code, user_name, email, pass_hash) VALUES (?, ?, ?, ?)", [code, username, email, passwordHash]);

        return {
            statusCode: 201,
            body: JSON.stringify({message: "User created successfully!"})
        }

    } catch(error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ title: "Internal server error" })
        }
    } finally {
        await connection.end();
    }
}
  