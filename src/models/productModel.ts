import { model, Schema, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Stock must be an integer",
      },
    },
  },
  { timestamps: true },
);

// بدل ما تعمل interface for productSchema استخدم ال inferSchemaType
// يا TypeScript، استنتجلي نوع البيانات الموجودة في productSchema وسمّيه IProduct.
export type IProduct = InferSchemaType<typeof productSchema>;

const Product = model("Product", productSchema);

export default Product;
