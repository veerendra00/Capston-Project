const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
}, {
    timestamps: true
})

const userModel = mongoose.model("user", schemaData)

mongoose.connect("mongodb+srv://BeFoody:befoody%40123@cluster0.cnm10wk.mongodb.net/crudoperation?retryWrites=true&w=majority")
    .then(() => console.log("connected successfully"))
    .catch((err) => console.log(err))

//read
//http://localhost:8080/
app.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

//creat data // save data im mongodb
//http://localhost:8080/create
/*
{
    name,
    email,
    mobile
}
*/
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data saved successfully" })
})

//update data
//http://localhost:8080/update
/**
 * {
 * id : "",
 * name : "",
 * email : "",
 * mobile : ""}
 */
app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest)
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated successfully", data: data })
})

//delete api
//http://localhost:8080/delete/id
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({ _id: id })
    res.send({ success: true, message: "data deleted successfully", data: data })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))