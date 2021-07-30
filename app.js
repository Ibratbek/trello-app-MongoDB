const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://trello:trelloadmin@cluster0.4lbgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected MongoDB`))
    .catch((err) => console.log(err));

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const Routes = require('./Routes/router');

app.use(Routes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));