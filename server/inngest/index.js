import { Inngest } from "inngest";
import User from "../models/User.js";
import Item from "../models/itemModel.js";
import Payment from "../models/paymentModel.js";
import PurchasedItem from "../models/purchasedItemModel.js";


// ✅ Import eSewa functions as ES module
import { getEsewaPaymentHash, verifyEsewaPayment } from "../../client/src/assets/esewa.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest function to save user data
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.create(userData);
  }
);

// Inngest function to delete user
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Inngest function to update user
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  }
);

// Payment endpoints
export const esewaRoutes = (app) => {
  app.post("/initialize-esewa", async (req, res) => {
    try {
      const { itemId, totalPrice } = req.body;

      const itemData = await Item.findOne({ _id: itemId, price: Number(totalPrice) });
      if (!itemData) return res.status(400).json({ success: false, message: "Item not found or price mismatch." });

      const purchasedItemData = await PurchasedItem.create({ item: itemId, paymentMethod: "esewa", totalPrice });
      const paymentInitiate = await getEsewaPaymentHash({ amount: totalPrice, transaction_uuid: purchasedItemData._id });

      res.json({ success: true, payment: paymentInitiate, purchasedItemData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get("/complete-payment", async (req, res) => {
    const { data } = req.query;
    try {
      const paymentInfo = await verifyEsewaPayment(data);
      const purchasedItemData = await PurchasedItem.findById(paymentInfo.response.transaction_uuid);
      if (!purchasedItemData) return res.status(500).json({ success: false, message: "Purchase not found" });

      const paymentData = await Payment.create({
        pidx: paymentInfo.decodedData.transaction_code,
        transactionId: paymentInfo.decodedData.transaction_code,
        productId: paymentInfo.response.transaction_uuid,
        amount: purchasedItemData.totalPrice,
        dataFromVerificationReq: paymentInfo,
        apiQueryFromUser: req.query,
        paymentGateway: "esewa",
        status: "success",
      });

      await PurchasedItem.findByIdAndUpdate(paymentInfo.response.transaction_uuid, { $set: { status: "completed" } });

      res.json({ success: true, message: "Payment successful", paymentData });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error during payment verification", error: error.message });
    }
  });

  app.get("/create-item", async (req, res) => {
    const itemData = await Item.create({ name: "Movie", price: 500, inStock: true, category: "yess done" });
    res.json({ success: true, item: itemData });
  });
};

// Export all Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
