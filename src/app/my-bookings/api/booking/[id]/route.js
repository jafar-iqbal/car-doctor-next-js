import { connectDB } from "@/lib/connect.DB";
import { ObjectId } from "mongodb";

// Helper function to create a response
const createResponse = (message, data = null, status = 200) => {
  return new Response(
    JSON.stringify({ message, data }),
    { status, headers: { "Content-Type": "application/json" } }
  );
};

// Delete booked data
export const DELETE = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");

  try {
    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 1) {
      return createResponse("Deleted the booking", result, 200);
    } else {
      return createResponse("Booking not found", null, 404);
    }
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    return createResponse("Something went wrong", error.message, 500);
  }
};

// Update booked data
export const PATCH = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");

  try {
    const updateData = await req.json();
    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...updateData } },
      { upsert: true }
    );

    if (result.matchedCount === 1) {
      return createResponse("Updated the booking", result, 200);
    } else {
      return createResponse("Booking not found", null, 404);
    }
  } catch (error) {
    console.error("Error updating booking:", error.message);
    return createResponse("Something went wrong", error.message, 500);
  }
};

// Get booked data
export const GET = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");

  try {
    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (booking) {
      return createResponse("Found", booking, 200);
    } else {
      return createResponse("Booking not found", null, 404);
    }
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    return createResponse("Something went wrong", error.message, 500);
  }
};
