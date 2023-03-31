const express = require('express')
const { engine } = require('express-handlebars');
const bodyParser = require("body-parser");

const connectDB = require('./config/db')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')

const port = 3000

const mongoose = require('mongoose');

const uri = 'mongodb+srv://khaitqph25638:1234@cluster1.fevxhlz.mongodb.net/test?retryWrites=true&w=majority';

const carsModel = require('./models/cars')
connectDB();

app.get('/', async (req, res) => {
    await carsModel.find({}).then((cars) => {
        res.render('home', { cars: cars.map(cars => cars.toJSON()) });
    })
})
app.get('/add', (req, res) => {
    res.render('add');
})

app.post('/add', async (req, res) => {
    if (req.body.id == '') {
        isAdd(req, res);
    }
    else {
        isEdit(req, res);
    }
})
const isAdd = async (req, res) => {
    const cars = new carsModel(req.body);
    try {
        await cars.save();
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}

const isEdit = (req, res) => {
    carsModel.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }).then((cars) => {
        res.redirect('/')
    }).catch((err) => {
        res.render('add');
    })
}

app.get('/edit/:id', async (req, res) => {

    await carsModel.findById(req.params.id).then(cars => {
        res.render('add', {
            cars: cars.toJSON(),
        })
    }).catch(err => {
        console.log(err);
    })
})

//delete
app.get('/delete/:id', async (req, res) => {
    try {
        const cars = await carsModel.findByIdAndDelete(req.params.id, req.body)
        if (!cars) {
            console.log("k có xe")
        }
        else {
            console.log('Deleted')
            res.redirect('/')
        }
    } catch (err) {
        console.log(err)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});