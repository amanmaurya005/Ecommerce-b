import { Schema,model } from "mongoose";

const cartSchema=new Schema({
    userId:{type:String,required:true},
    productId:{type:String,required:true},
    quantity:{type:Number,required:true},
},
{timestamps:true}
);

const Cart=model("cart",cartSchema);
export default Cart;