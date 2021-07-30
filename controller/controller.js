const User = require('../model/user');
const Column = require('../model/column');
const Card = require('../model/card');
const bcrypt = require('bcrypt');

module.exports.getHomeRoute = (req, res) => {
    res.render('index')
}

module.exports.getLoginRoute = (req, res) => {
    res.render('login')
}

module.exports.postLoginRoute = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.find({ email: email });

    if (!user) {
        res.send(`Email or password incorrect <a href="/login">`)
    }
    let validatePassword = await bcrypt.compare(password, user[0].password);

    if (validatePassword) {
        res.redirect(`/dashboard/${user[0]._id}`)
    } else {
        res.redirect('/login');
    }
}

module.exports.getRegisterRoute = (req, res) => {
    res.render('register')
}

module.exports.postRegisterRoute = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.find({ email: email });

    if (!user) {
        res.send(`Already registered this email. Please try. <a href="/register">`)
    } else {
        const Nuser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await Nuser.save();
        res.redirect('/login');
    }
}

module.exports.getDashboardRoute = async (req, res) => {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    let columns = await Column.find();
    let cards = await Card.find();

    res.render('dashboard', {
        user: user,
        columns: columns,
        cards: cards
    });
}

module.exports.postSearchRoute = async (req, res) => {
    const text = req.body.searchText;
    const userId = req.body.userId;
    let cards = await Card.find();
    let columns = await Column.find();
    const user = await User.find({ _id: userId });

    let cardlar = []
   
        cards.forEach(card => {
            if (card.content.includes(text)) {
                cardlar.push(card)
            }
        });
        res.render('dashboard.ejs', {
            columns: columns,
            cards: cardlar,
            user:user
        });
}

module.exports.postAddColumn = async (req, res) => {
    const columnName = req.body.columnName;
    const userId = req.body.userId;

    const column = new Column({
        title: columnName
    });

    await column.save()
    res.redirect(`/dashboard/${userId}`);
}

module.exports.postAddCard = async (req, res) => {
    const cardContent = req.body.cardContent;
    const columnId = req.body.columnId;
    const userId = req.body.userId;

    const card = new Card({
        content: cardContent,
        id: columnId
    });
    await card.save()
    res.redirect(`/dashboard/${userId}`);
}

module.exports.getCardInfo = async (req, res) => {
    const userId = req.params.userId;
    const cardId = req.params.cardId;

    const card = await Card.find({ _id: cardId });
    const users = await User.find();

    res.render('card', {
        card: card,
        userId: userId,
        users: users
    });
};

module.exports.updateCardInfo = async (req, res) => {
    const userId = req.params.userId;
    const cardId = req.params.cardInfoId;

    const assignUser = req.body.assignesUser;
    const cardDescription = req.body.cardDescription;

    await Card.updateOne({ _id: cardId }, { $push: { users: assignUser }, description: cardDescription })

    res.redirect(`/dashboard/${userId}`);
};

module.exports.deleteAssignUser = async (req, res) => {
    const userId = req.params.userId;
    const cardId = req.params.cardId;
    const assignUser = req.params.assignUser;
    await Card.update({
        _id: cardId
    }, {
        $pull: {
            users: {
                $in: [assignUser]
            }
        },
            multi: true
        });
    res.redirect(`/dashboard/${userId}`);
};

module.exports.postComment = async (req, res) => {
    const userId = req.params.userId;
    const cardId = req.params.cardId;
    let commentContent = req.body.commentContent;

    const user = await User.find({ _id: userId });

    await Card.updateOne({ _id: cardId }, { $push: { comments: { user: user[0].name, comment: commentContent } } });

    res.redirect(`/dashboard/${userId}`);
}

module.exports.postCardInfo = (req, res) => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;

    res.redirect(`/dashboard/${userId}/cards/${cardId}`);
}

module.exports.getEditCardId = async (req, res) => {
    const userId = req.params.userId;
    const cardId = req.params.cardId;

    const card = await Card.find({ _id: cardId });
    res.render('edit', {
        userId: userId,
        card: card
    });
}

module.exports.postEditCard = async (req, res) => {
    const userId = req.body.userId;
    const cardId = req.body.cardId;
    const cardContent = req.body.cardContent;
    console.log(cardId)

    await Card.updateOne({ _id: cardId }, { content: cardContent });
    res.redirect(`/dashboard/${userId}`);
};

module.exports.postEditCardId = async (req, res) => {
    const cardId = req.params.id;
    const userId = req.body.userId;

    res.redirect(`/dashboard/${userId}/edit-card/${cardId}`);
}

module.exports.postDeleteCardId = async (req, res) => {
    const cardId = req.params.id;
    await Card.deleteOne({ _id: cardId });
    const userId = req.body.userId;
    res.redirect(`/dashboard/${userId}`);
}







