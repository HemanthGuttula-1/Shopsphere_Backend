const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const dns = require('dns')
const Product = require("./models/Product");
const products = require("./products.json");

// dotenv.config();
dns.setServers(['8.8.8.8'])
console.log("Dns server:",dns.getServers())
// setting the DNS for the current  process 

const seedProducts = async () => {
  try {

    await mongoose.connect("mongodb+srv://guttulahemanth:h03an20h@clusterho3an20h.443o0.mongodb.net/ShopSphere?retryWrites=true&w=majority&appName=Clusterho3an20h");

    console.log("MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Inserted");

    process.exit();

  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedProducts();