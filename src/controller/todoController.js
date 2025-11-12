import initdb from "../models/db.js";
import todoModel from "../models/schema.js"

await initdb();

//Create
export const insertTodo = async(formData)=>{
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

//Read
export const getTodos = async()=> {
    try {
        const result = await todoModel.find();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//Update
// const editTodo = async ()=>{
//     try {
        
//     } catch (error) {
//         console.log(error)
//     }
// }
// //Delete
// const deleteTodo = async () => {
//   try {
//     await todoModel.deleteOne()
//   } catch (error) {
//     console.log(error);
//   }
// };

//export default {insertTodo, getTodos};