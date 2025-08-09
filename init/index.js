const mongoose = require("mongoose")
const listing = require("../models/listing")
const initdata = require("./data")

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/AlphineHut');
}
main().then(()=>{
    console.log("connection sucessful")
})
.catch(()=>{
    console.log("error caught")
})

// const del =async  ()=>{
//     await listing.findByIdAndDelete('68890f5e3f8effe798a8655a');
// }
// del()

const initdb = async()=>{
   await listing.deleteMany({});
   initdata.data = initdata.data.map((obj) => ({...obj,owner:'6895becff1c2ab4f967b45a7',})); // Assuming you want to set a default owner for all listings
   await listing.insertMany(initdata.data);
   console.log("data was initialized");

}
initdb()  