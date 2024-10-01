import express from "express";
import { connectToDatabase } from "./configDatabase.js";
import { ProductRepository } from "./utils/productRepository.js";

// set constatnt data
const port = 3000;

// connect to database
const db = await connectToDatabase();

// call express
const app = express();

// set url encoded
app.use(express.urlencoded({ extended: true }));

// set json
app.use(express.json());

// create product repository
const productRepo = new ProductRepository(db);

// set api

// insert new product(s)
app.post("/api/products", async (req, res) => {
  const result = await productRepo.createProduct(req.body);

  if (result.affectedRows === 0) {
    res.status(400).send({
      message: "Failed to insert data",
    });
    return;
  }

  res.status(201).send({
    message: "Product is inserted successfully",
  });
});

// get all products
app.get("/api/products", async (req, res) => {
  const result = await productRepo.getAllProducts();
  try {
    res.send({
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
    });
  }
});

// update product
app.put("/api/products", async (req, res) => {
  const result = await productRepo.updateProduct(req.body);

  if (result.affectedRows === 0) {
    res.status(400).send({
      message: "Failed to update data",
    });
    return;
  }

  res.status(201).send({
    message: "Product is updated successfully",
  });
});

// set port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
