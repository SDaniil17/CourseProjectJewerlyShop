let https=require('https');
let fs=require('fs');
require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/init-models.js')
const cors = require('cors')
const PORT = process.env.PORT;
const router = require('./routes/index.js')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const path = require('path')
const WebSocket = require('ws');

const app = express();




const options = {
    key: fs.readFileSync('LAB.key').toString(),
    cert: fs.readFileSync('LAB.crt').toString()
};


const httpsServer = https.createServer(options, app);

// запускаем сервер
httpsServer.listen(5000, () => {
    console.log(`Server started on port ${5000}`);
});
const wss = new WebSocket.Server({ server: httpsServer });

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


//обработка ошибок
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate() //установка подключения к бд
        await sequelize.sync()
        console.log('Database connected...')
    } catch (e) {
        console.log(e)
    }
}
start() 

//ws
let messageArray =[]

let clients = new Map();

wss.on('connection', function connection(ws) {
    console.log('connetct');
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        const { type, text, to,from } = data;
        console.log(text)
        client = clients.get(to);

        if (type === 'login') {
            clients.set(text, ws);
            console.log(`Client ${text} connected`);
            let tousermessage= JSON.stringify(messageArray.filter(item => item.from === text||item.to===text));
            clients.get(text).send(tousermessage)
           // ws.send(JSON.stringify({ type: 'info', text: 'Welcome to the chat!' }));
        } else if (type === 'message') {
            if (to === 'Admin') {
                const admin = clients.get('Admin');
                messageArray.push({from:from,to:to,text:text})
                if (admin) {
                    console.log('Admin')
                    console.log('to ::'+ to  )
                    wss.clients.forEach(client =>{
                        if (client?.readyState === WebSocket.OPEN && clients.get('Admin') === client) {
                            console.log('send to Admin')
                            client.send(JSON.stringify(messageArray));
                        }
                    });
                } else {

                  
                  
                }
            }

            else {
                messageArray.push({from:from,to:to,text:text})
                let tousermessage= messageArray.filter(item => item.from === to||item.to===to);
                console.log('to user')
                if(clients.get(to)?.readyState===WebSocket.OPEN){ clients.get(to).send(JSON.stringify(tousermessage))}


            }
        }
    });
    function getByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
            if (value === searchValue)
                return key;
        }
    }
    ws.on('close', () =>{
        console.log('this close')
        let delClient = getByValue(clients, ws)
        console.log('userdelete ' +delClient)
        clients.delete(delClient)
        console.log('Client disconnected');
    });
});