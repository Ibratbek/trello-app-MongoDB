const router = require('express').Router();

const controller = require('../controller/controller');

router.get('/', controller.getHomeRoute);

router.get('/login', controller.getLoginRoute);
router.post('/login', controller.postLoginRoute);

router.get('/register', controller.getRegisterRoute);
router.post('/register', controller.postRegisterRoute);

router.get('/dashboard/:id', controller.getDashboardRoute);

router.post('/search', controller.postSearchRoute);

router.post('/add-column', controller.postAddColumn);
router.post('/add-card', controller.postAddCard);

router.get('/dashboard/:userId/edit-card/:cardId', controller.getEditCardId);
router.post('/dashboard/:userId/edit-card/:cardId', controller.postEditCard);

router.get('/dashboard/:userId/cards/:cardId', controller.getCardInfo);
router.post('/dashboard/:userId/cards/:cardId', controller.postCardInfo);

router.post('/dashboard/:userId/card/:cardInfoId',controller.updateCardInfo);

router.get('/dashboard/:userId/cards/:cardId/:assignUser',controller.deleteAssignUser);
router.post('/dashboard/:userId/cards/:cardId/comment',controller.postComment);

router.post('/edit-card/:id', controller.postEditCardId);
router.post('/delete-card/:id', controller.postDeleteCardId);


module.exports = router;