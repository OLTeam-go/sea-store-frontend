const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "/client/build")))

app.get("/api/getList", (req, res) => {
    res.json(["item1", "item2", "item3"])
})

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

const port = process.env.PORT || 5000
app.listen(port)