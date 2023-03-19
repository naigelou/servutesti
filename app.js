import express from "express"
import {getnumerot, getnumero, numbercheck} from './database.js'
const app = express()
app.set("view engine", "ejs")

app.use(express.static("public"))


app.get('/', async (req, res) =>{
    let numerotarkastus = ""
    console.log("Check1")
    res.render("index", {
        numerotarkastus: numerotarkastus || {}
      });
 })

app.get("/check", async (req, res) => {
    const searchTerm = req.query.searchterm;
    console.log("Check 2")
    const numerotarkastus = await numbercheck(searchTerm);
    console.log(numerotarkastus)
    res.render("index", {
        numerotarkastus: numerotarkastus
      });
  });

app.get("/numerot", async (req, res) =>{
    const numerot = await getnumerot()
    res.send(numerot)
})

app.get("/numerot/:id", async (req, res) =>{
    const id =req.params.id
    const numero = await getnumero(id)
    res.send(numero)
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


app.listen(8080, () => {
    console.log("Server is running on port 8080")
})
