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
		console.log(description)
		const newTodo = await pool.query(
			`INSERT INTO todo (description) VALUES($1) RETURNING *`,
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
		console.log(error.message)
	}
})

//Get one

app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params
		const selectedTodos = await pool.query(
			`SELECT * FROM todo WHERE todo_id = $1`,
			[id]
		)
		res.json(selectedTodos.rows)
	} catch (error) {
		console.log(error.message)
	}
})

//update
app.patch("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { description } = req.body
		const updateTodo = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2",
			[description, id]
		)
        res.json("Updated Todo")
	} catch (error) {
        console.log(error.message);
    }
})

//delete
app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params
		const deleteTodo = await pool.query(
			`DELETE FROM todo WHERE todo_id = $1`,
			[id]
		)
		res.json('task deleted')
	} catch (error) {
		console.log(error.message)
	}
})

app.listen(8000, () => {
	console.log("Server running on port 8000")
})
