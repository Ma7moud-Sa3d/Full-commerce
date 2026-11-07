import mongoose, { Schema, type InferSchemaType } from "mongoose";


const orderItemsSchema = new Schema({
  productTitle:{
    type: String,
    required: true,
  },
  productImage:{
    type: String,
    required: true
  },
  productPrice:{
    type: Number,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  }
})

const orderSchema = new Schema({
  orderItems: [orderItemsSchema],
  totla: {type: Number, required: true},
  address: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, required: true, ref: "User"},
})

export type IOrderItems = InferSchemaType<typeof orderItemsSchema>
export type IOrder = InferSchemaType<typeof orderSchema>

export const orderModel = mongoose.model<IOrder>("Order", orderSchema)

