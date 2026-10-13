import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Entrepreneur } from "../models/Entrepreneur.js";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { Service } from "../models/Service.js";
import { Complaint } from "../models/Complaint.js";

await connectDB();

await Promise.all([
  User.deleteMany({}),
  Entrepreneur.deleteMany({}),
  Category.deleteMany({}),
  Product.deleteMany({}),
  Service.deleteMany({}),
  Complaint.deleteMany({})
]);

const passwordHash = await bcrypt.hash("Password123!", 12);

const [customer, entrepreneurUser, admin] = await User.create([
  { name: "Demo Customer", email: "customer@hunarhub.local", passwordHash, role: "customer", isVerified: true },
  { name: "Sunita Sharma", email: "entrepreneur@hunarhub.local", passwordHash, role: "entrepreneur", isVerified: true },
  { name: "HunarHub Admin", email: "admin@hunarhub.local", passwordHash, role: "admin", isVerified: true }
]);

const entrepreneur = await Entrepreneur.create({
  user: entrepreneurUser._id,
  businessName: "Sunita Pottery Studio",
  ownerName: "Sunita Sharma",
  category: "Potter",
  skills: ["Clay Pottery", "Hand-painted Diyas", "Traditional Crafts"],
  bio: "Traditional handmade pottery created locally with care.",
  location: { city: "Varanasi", state: "Uttar Pradesh", pincode: "221001" },
  isVerified: true,
  rating: 4.9,
  reviewCount: 28
});

await Category.insertMany([
  { name: "Cobbler", slug: "cobbler" },
  { name: "Potter", slug: "potter" },
  { name: "Tailor", slug: "tailor" },
  { name: "Artisan", slug: "artisan" },
  { name: "Small Vendor", slug: "small-vendor" }
]);

await Product.create([
  { entrepreneur: entrepreneur._id, title: "Hand-painted Diya Set", description: "Set of handmade festive diyas.", category: "Potter", price: 299, stock: 25, rating: 4.8, reviewCount: 12 },
  { entrepreneur: entrepreneur._id, title: "Traditional Clay Pot", description: "Hand-shaped traditional clay pot.", category: "Potter", price: 499, stock: 12, rating: 4.9, reviewCount: 18 },
  { entrepreneur: entrepreneur._id, title: "Handmade Wooden Decor", description: "Local artisan home decor.", category: "Artisan", price: 799, stock: 8, rating: 4.7, reviewCount: 9 }
]);

await Service.create([
  { entrepreneur: entrepreneur._id, title: "Custom Pottery", description: "Custom clay pottery for homes and events.", category: "Potter", price: 699, durationMinutes: 120, rating: 4.9 },
  { entrepreneur: entrepreneur._id, title: "Hand-painted Diya Decoration", description: "Traditional hand-painted diya decoration service.", category: "Potter", price: 399, durationMinutes: 90, rating: 4.8 }
]);

console.log("HunarHub seed completed.");
console.log("Customer: customer@hunarhub.local / Password123!");
console.log("Entrepreneur: entrepreneur@hunarhub.local / Password123!");
console.log("Admin: admin@hunarhub.local / Password123!");
process.exit(0);
