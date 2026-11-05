import { model, Schema, type InferSchemaType } from "mongoose";

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: "Amount must be an integer",
    },
  },
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "complete"],
    default: "active",
  },
}, {timestamps: true});

export type ICartItem = InferSchemaType<typeof cartItemSchema>;

export type ICart = InferSchemaType<typeof cartSchema>;

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
