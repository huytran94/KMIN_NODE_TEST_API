class ProductRepository {
  constructor(db) {
    this.db = db;
  }

  // get all products
  async getAllProducts() {
    const [result] = await this.db.query("SELECT * FROM products");
    return result;
  }

  // get single product by name
  async getProductByName(name) {
    const [result] = await this.db.query(
      "SELECT * FROM products where name LIKE ?",
      ["%" + name + "%"]
    );

    console.log("result", result);

    return result;
  }

  // create product
  async createProduct(productInfo) {
    const { name, description, price, image } = productInfo;
    const [result] = await this.db.query(
      "INSERT INTO `products` (name, description, price, image) VALUES (?, ?, ?, ?)",
      [name, description, price, image]
    );

    return result;
  }

  // update product
  async updateProduct(updateProductInfo) {
    // get all product info
    const { name, description, price, image } = updateProductInfo;

    const foundProduct = await this.getProductByName(name);

    // check if product exist in db
    if (foundProduct.length === 0) {
      throw new Error("Product not found");
    }

    const sql =
      "UPDATE `products` SET `name` = ?, `description` = ?, `price` = ?, `image` = ? WHERE `id` = ?";

    const [result] = await this.db.query(sql, [
      name,
      description,
      price,
      image,
      foundProduct[0].id,
    ]);

    return result;
  }
}

// delete product

export { ProductRepository };
