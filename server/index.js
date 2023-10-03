const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const multer = require('multer')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findById({_id: id})
    .then(users => res.json(users))
    .catch(err => res.json(err))

})

app.put("/updateUser/:id", upload.single('image'), (req, res) => {
    const id = req.params.id;
    const { name, password, address } = req.body;
    if (req.file) {
        const imagePath = req.file.path;
        
        UserModel.findByIdAndUpdate(
            { _id: id },
            {
                name: name,
                password: password,
                address: address,
                imagePath: imagePath,
            },
            { new: true }
        )
            .then(updatedUser => {
                res.json(updatedUser);
            })
            .catch(err => res.json(err));
    } else {
        UserModel.findByIdAndUpdate(
            { _id: id },
            {
                name: name,
                password: password,
                address: address,
            },
            { new: true }
        )
            .then(updatedUser => {
                res.json(updatedUser);
            })
            .catch(err => res.json(err));
    }
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/createUser', upload.single('image'), (req, res) => {
    const { name, password, address } = req.body;
    const imagePath = req.file.path;
  
    UserModel.create({ name, password, address, imagePath })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  });


app.listen(3001, () => {
    console.log('Server is Running')
})