import Cart from "../models/cart.js";
import { io } from "../index.js";


export async function addToCart(req, res) {
  try {
    const data = req.body;
    data.userId = req.userId;

    let cartItem = await Cart.findOne({
      userId: data.userId,
      productId: data.productId,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new Cart(data);
      await cartItem.save();
    }

    const updatedCart = await Cart.find({ userId: req.userId })
      .populate("productId");

    // 🔥 REAL-TIME
    io.to(req.userId).emit("cart:update", updatedCart);

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// export async function addToCart(req, res) {
//   try {
//     const data = req.body; //{productId,quantity}
//     data.userId = req.userId; //{productId,quantity,userId}

//     const existingCartItem = await Cart.findOne({
//       userId: data.userId,
//       productId: data.productId,
//     });

//     if (existingCartItem) {
//       existingCartItem.quantity = String(Number(existingCartItem.quantity));
//       await existingCartItem.save();
//       return res.status(200).json({
//         message: "Product already in cart",
//         product: existingCartItem,
//       });
//     } else {  
//       const productInCart = new Cart(data);
//       await productInCart.save();
//       return res
//         .status(201)
//         .json({ message: "Product added in cart", product: productInCart });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

export async function getCart(req, res) {
  try {
    const response = req.userId;
    const cart = await Cart.find({ userId: response }).populate("productId")
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function removeCart(req, res) {
  try {
    const { id } = req.params;

    await Cart.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    const updatedCart = await Cart.find({ userId: req.userId })
      .populate("productId");

    io.to(req.userId).emit("cart:update", updatedCart);

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}



// export async function removeCart(req, res) {
//   try {
//     console.log("req")
//     const { id } = req.params;

//     await Cart.findByIdAndDelete(id);

//     return res.status(200).json({
//       message: "Item removed from cart",
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }



export async function updateCartQuantity(req, res) {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const cartItem = await Cart.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (action === "inc") cartItem.quantity += 1;
    if (action === "dec") cartItem.quantity = Math.max(1, cartItem.quantity - 1);

    await cartItem.save();

    const updatedCart = await Cart.find({ userId: req.userId })
      .populate("productId");

    io.to(req.userId).emit("cart:update", updatedCart);

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}



// export async function updateCartQuantity(req, res) {
//   try {
//     if (!req.userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const { id } = req.params; // cart item id
//     const { action } = req.body; // "inc" | "dec"

//     const cartItem = await Cart.findOne({
//       _id: id,
//       userId: req.userId,
//     });

//     if (!cartItem) {
//       return res.status(404).json({ message: "Cart item not found" });
//     }

//     if (action === "inc") {
//       cartItem.quantity += 1;
//     }

//     if (action === "dec") {
//       cartItem.quantity = Math.max(1, cartItem.quantity - 1);
//     }

//     await cartItem.save();

//     const cart = await Cart.find({ userId: req.userId }).populate("productId");
//     const validCart = cart.filter((item) => item.productId !== null);

//     return res.status(200).json(validCart);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

