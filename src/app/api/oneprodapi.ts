import Product from "@/app/models/product.model";
import connectDB from "@/app/utils/connestDB";

const getOneProduct = async (id:string) => {
    try {
      await connectDB();
  
      const oneProduct = await Product.findById(id);
      return oneProduct;
    } catch (error: any) {
      throw new Error("Error fetching Product Details", error);
    }
  };

  export default getOneProduct;