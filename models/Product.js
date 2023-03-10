import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rate: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
