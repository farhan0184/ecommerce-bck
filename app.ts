import compression from "compression";
import  express  from "express";
import helmet from "helmet";
import config from "./config";
import cors from 'cors'
import { decodeToken } from "./middlewares/auth.middleware";

const app = express();

app.use(compression())
app.use(helmet())
app.use(decodeToken)
app.use(express.json())
app.use(
    express.json()
)

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", config.cors.origin)
    res.header("Access-Control-Allow-Headers", config.cors.headers)
    res.header("Access-Control-Allow-Methods", config.cors.methods)
    next()
})

app.use(cors())


app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'hello world',
    })
})

app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Route/Method not found',
    })
})

export default app