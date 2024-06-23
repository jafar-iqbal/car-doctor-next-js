import { connectDB } from "@/lib/connect.DB";

export const GET = async (req, { params }) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

    const myBookings = await bookingsCollection.find({ email: params.email }).toArray();

    return new Response(JSON.stringify({ myBookings }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);

    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
