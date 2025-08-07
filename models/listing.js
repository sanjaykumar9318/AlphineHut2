const mongoose = require("mongoose")
const schema = mongoose.Schema;
const review = require("./review")
const listingschema = new schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
      type: String,
      required: true,
      default: "https://unsplash.com/photos/lighthouse-stands-tall-on-a-rocky-coastline-QdDg2X_2gj0"

  },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type: schema.Types.ObjectId,
        ref: "review"
    }],
});

listingschema.post('findOneAndDelete', async(listing)=> {
    await review.deleteMany({
        _id: { $in: listing.reviews }
    })});

const listing = mongoose.model("listing",listingschema);
module.exports = listing

