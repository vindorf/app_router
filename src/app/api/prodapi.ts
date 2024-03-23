import Product from "@/app/models/product.model";
import connectDB from "@/app/utils/connestDB";

const getProducts = async () => {
  try {
    await connectDB();

    const products = await Product.find();
    return products;
  } catch (error:any) {
    throw new Error("Error fetching Data", error);
  }
};



export default getProducts;



