import initdb from "../models/db.js";
import todoModel from "../models/schema.js"

await initdb();

const insertTodo = async(formData)=>{
    try {
        await initdb();
        //console.log(formData.name);
        const result = await todoModel.create({
            todo: formData.todo,
            //completed: formData.completed //to change later....
        })
        return result
    } catch (error) {
        console.log(error)
    }
}

export default insertTodo;