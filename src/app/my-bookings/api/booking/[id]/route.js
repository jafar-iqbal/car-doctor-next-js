import { connectDB } from "@/lib/connect.DB";
import { ObjectId } from "mongodb";

// Delete booked data
export const DELETE = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");

  try {
    const myBookings = await bookingsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    if (myBookings.deletedCount === 1) {
      return new Response(
        JSON.stringify({ message: "Deleted the booking", res: myBookings }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Booking not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
};

// Update booked data
export const PATCH = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");

  try {
    const updateData = await req.json();
    const myBookings = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: {...updateData} },
      { upsert: true }
    );

    if (myBookings.matchedCount === 1) {
      return new Response(
        JSON.stringify({ message: "Updated the booking", res: myBookings }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Booking not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
};

// Get booked data
export const GET = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");

  try {
    const myBookings = await bookingsCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (myBookings) {
      return new Response(
        JSON.stringify({ message: "Found", res: myBookings }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Booking not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
};
