import "dotenv/config"
import express, { Application } from "express"
import { startDatabase } from "./database"
import logic from "./logic"
import middlewares from "./middlewares"

const app: Application = express()
app.use(express.json())

app.post("/movies", middlewares.nameExists, logic.create)
app.get("/movies", logic.read)

app.use("/movies/:id", middlewares.idExists)

app.get("/movies/:id", logic.retrieve)
app.patch("/movies/:id", middlewares.nameExists, logic.partialUpdate)
app.delete("/movies/:id", logic.destroy)

const PORT: number = 3000
app.listen(PORT, async (): Promise<void> => {
    await startDatabase()
    console.log(`Server running on port ${PORT}`)
})