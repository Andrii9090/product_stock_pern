import server from "./server";
import dotenv from 'dotenv';
import colors from 'colors';
import db from "./config/db";


dotenv.config()

const connectDb = async () => {
    try {
        await db.authenticate();
        console.log(colors.green.bold.underline("database connected"))
        db.sync()
    } catch (error) {
        console.log(colors.red.bold(error as string))
    }
}

connectDb()

server.listen(process.env.PORT! || 3000, () => {
    console.log("server is listening on port " + process.env.PORT! || 3000);
})