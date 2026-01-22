import Coupon from "../models/coupon.js";

/* CREATE COUPON */
export async function createCoupon(req, res) {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* GET ALL COUPONS */
export async function getAllCoupons(req, res) {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* UPDATE COUPON */
export async function updateCoupon(req, res) {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* DELETE COUPON */
export async function deleteCoupon(req, res) {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* APPLY COUPON (CART LOGIC) */
export async function applyCoupon(req, res) {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon)
      return res.status(404).json({ message: "Invalid coupon" });

    if (coupon.status !== "active")
      return res.status(400).json({ message: "Coupon inactive" });

    if (coupon.expiryDate < new Date())
      return res.status(400).json({ message: "Coupon expired" });

    if (
      coupon.usageLimit > 0 &&
      coupon.usedCount >= coupon.usageLimit
    )
      return res.status(400).json({ message: "Coupon usage limit reached" });

    if (cartTotal < coupon.minOrderAmount)
      return res.status(400).json({
        message: `Minimum order ₹${coupon.minOrderAmount} required`,
      });

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (cartTotal * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      discount,
      finalAmount: cartTotal - discount,
      couponId: coupon._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
