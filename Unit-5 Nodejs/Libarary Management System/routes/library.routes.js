const express = require("express");
const router = express.Router();
const controller = require("../controllers/library.controller");
const middleware = require("../middleware/library.middleware");

router.param("id", controller.findBook);

router.post("/", middleware.validateBookData, controller.addBook);
router.get("/", controller.getBooks);
router.patch("/borrow/:id", middleware.validateBorrow, controller.borrowBook);
router.patch("/return/:id", middleware.validateReturn, controller.returnBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
