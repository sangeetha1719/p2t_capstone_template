const mongoose = require("mongoose");

// Order item schema
const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, { _id: false });

// Shipping address schema
const shippingAddressSchema = new mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false });

// Main order schema
const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderItems: [orderItemSchema],

    shippingAddress: shippingAddressSchema,

    paymentMethod: {
        type: String,
        enum: ["card", "stripe"],
        default: "card"
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0
    },

    taxPrice: {
        type: Number,
        required: true,
        default: 0
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },

    status: {
        type: String,
        enum: ["pending", "paid", "delivered", "cancelled"],
        default: "pending"
    },

    isPaid: {
        type: Boolean,
        default: false
    },

    paidAt: Date,

    isDelivered: {
        type: Boolean,
        default: false
    },

    deliveredAt: Date,

    stripePaymentIntentId: String,
    stripeSessionId: String

}, {
    timestamps: true
});

// indexes
orderSchema.index({ user: 1 });
orderSchema.index({ createdAt: -1 });

// virtual order number
orderSchema.virtual("orderNumber").get(function () {
    return `ORDER-${this._id.toString().slice(-6).toUpperCase()}`;
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;