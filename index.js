const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Routes

//Create

app.post("/todos", async (req, res) => {
	try {
		// console.log(req.body)
		const { description } = req.body
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *",
			[description]
		)

        res.json(newTodo.rows[0])
	} catch (error) {
		console.log(error.message)
	}
})

//Get all

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.log(error.message);
    }
})

//Get one

app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const selectedTodos = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`)
        res.json(selectedTodos.rows)
    } catch (error) {
        console.log(error.message);
    }
})

//update

//delete

app.listen(8000, () => {
	console.log("Server running on port 8000")
})
