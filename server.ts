import connectMongo from "./config/database";
import {Server} from "http";
import isPortAvailable from 'is-port-available'
import app from "./app";
import {seedDB} from "./utils/seedDb";

const server = new Server(app);

connectMongo().then(async () => {
    await seedDB()
})

const PORT = process.env.PORT || 8000;

const getAvailablePort = async () => {
    let port: any = PORT
    while (!(await isPortAvailable(port))) {
        port++
    }
    return port
}

getAvailablePort().then(async (port: number) => {
    server.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
})