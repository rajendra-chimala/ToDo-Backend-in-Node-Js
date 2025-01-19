const Todo  = require("../model/todo.model.js");


const createTodo = async(req,res)=>{
    const todo = new Todo({
        text:req.body.text,
        completed:req.body.completed
    })

    try {

        const newTodo = await todo.save();
        res.status(201).json({message: "Todo is Created !",newTodo})
        
    } catch (error) {
        console.log(error);

        res.status(400).json({message:"Error is todo creation ...!"})
        
        
    }

};


const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            message: "Todos fetched successfully!",
            todos
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(400).json({ message: "Error occurred while fetching todos!" });
    }
};


const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(201).json({ message: "Updated!", todo });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error occurred while updating the todo!" });
    }
};


const deleteTodo = async (req,res)=>{
    try {
         await Todo.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"Deleted Success !"})
    } catch (error) {
        console.log("Error in Deleting : " + error);
        res.status(400).json({message:"Error in Deleting !"});
        
    }
}

module.exports = {createTodo,getTodos,updateTodo,deleteTodo};