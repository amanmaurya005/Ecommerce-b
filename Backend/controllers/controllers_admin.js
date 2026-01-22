// import Auth from "../models/models_auth.js";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import "dotenv/config"



// export async function loginAdmin(req, res) {
//     try {
//         const data = req.body;
//         console.log(data)
//         const AdminExist = await Auth.findOne({ email: data.email });
//         console.log(AdminExist)
//         if (!AdminExist)
//             return res.status(400).json({ message: "Email not found" });


//         const doesPasswordMatch = await bcrypt.compare(data.password, AdminExist.password);
//         if (!doesPasswordMatch)
//             return res.status(404).json({ message: "password not match" });
//         // console.log(AdminExist)
//         if (AdminExist.role !== "admin")
//             return res.status(401).json({ message: "You are not Admin" });


//         const admin_token = jwt.sign({
//             id: AdminExist._id,
//             role: AdminExist.role,
//         },
//             process.env.JWT_SECRET,
//             { expiresIn: "3h" }
//         );

//         res.cookie("admin_token", admin_token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//             maxAge: 3600000,
//         });

//         return res.status(200).json({ message: "LogedIn" });

//     }
//     catch (error) {
//         return res.status(500).json({ message: error.message });
//     }


// };


// export async function logoutAdmin(req, res) {
//     try {
//         res.cookie("admin_token", admin_token), {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//             maxAge: -1,  // any negative time
//         };
//         return res.status(200).json({ message: "Admin Logged out" });

//     }
//     catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };


// export async function updateAdmin(req, res) {
//     try {
//         const { id } = req.params;
//         const updatedRecord = req.body;
//         if (!id) {
//             return res.status(400).json({ message: "ID parameter is required" });
//         }
//         if (!updatedRecord) {
//             return res
//                 .status(400)
//                 .json({ message: "Updated product schema is required" });
//         }

//         const updatedAdmin = await Auth.findByIdAndUpdate(id, updatedRecord, {
//             new: true,
//         });
//         if (!updatedAdmin)
//             return res.status(404).json({ message: "Could not update this product" });

//         return res.status(200).json({ message: "Product Updated", product: updatedAdmin });

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }


import pool from "../db/mysql.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// ================= ADMIN LOGIN =================
export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    const admin = rows[0];

    const doesPasswordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!doesPasswordMatch) {
      return res.status(404).json({ message: "password not match" });
    }

    if (admin.role !== "admin") {
      return res.status(401).json({ message: "You are not Admin" });
    }

    const admin_token = jwt.sign(
      {
        id: admin.id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.cookie("admin_token", admin_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "LoggedIn" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// ================= ADMIN LOGOUT =================
export async function logoutAdmin(req, res) {
  try {
    res.clearCookie("admin_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Admin Logged out" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// ================= UPDATE ADMIN =================
export async function updateAdmin(req, res) {
  try {
    const { id } = req.params;
    const updatedRecord = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    const [result] = await pool.query(
      "UPDATE users SET ? WHERE id = ? AND role = 'admin'",
      [updatedRecord, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Could not update admin or admin not found",
      });
    }

    return res.status(200).json({ message: "Admin Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
