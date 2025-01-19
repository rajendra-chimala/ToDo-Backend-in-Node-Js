const {createTodo,getTodos,updateTodo,deleteTodo} = require("../conttoller/todo.controller");

const express = require("express");
 const router = express.Router();

router.post("/create",createTodo);

router.get("/all",getTodos);

router.put("/update/:id",updateTodo);

router.delete("/delete/:id",deleteTodo);

module.exports =router;