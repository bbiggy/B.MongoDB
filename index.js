const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { count } = require('console')

const dbConfig = require('./config/mongodb.config.js')
const Customer = require('./models/customer.js')

const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(()=>{
        Customer.deleteMany({},(err)=>{
    if (err){
        process.exit();
            }
            console.log('Remove Collection of Customer')
            initCustomer();
        });
    }).catch(err=>{
        console.log('cannot connect to MongoDB')
        process.exit();
    })

app.use(cors())
require('../B_MongoDB/routes/customer.route.js')(app);

const server = app.listen(3000, ()=>{
    let port = server.address().port
    console.log('Run at http://localhost:%s', port)
})

function initCustomer(){
    let data = [
        {
            CustomerId: 1001,
            Fullname: "Big",
            address:  "Bangkok"
        },
        {
            CustomerId: 1002,
            Fullname: "Don",
            address:  "Chiangmai"
        },
        {
            CustomerId: 1003,
            Fullname: "Ball",
            address:  "Bangkok"
        }
    ]
    for(let i = 0; i<data.length; i++){
        const c = new Customer(data[i]);
        c.save()
    }
    console.log("สร้างข้อมูล Customer สำเร็จแล้ว")
}
