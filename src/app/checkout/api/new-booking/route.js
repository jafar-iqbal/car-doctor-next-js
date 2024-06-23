import { connectDB } from "@/lib/connect.DB";

export const POST = async (req) => {
  try {
    const newBooking = await req.json(); // Parse the incoming request body as JSON

    const db = await connectDB(); // Connect to the database
    const bookingsCollection = db.collection("bookings");

    const res = await bookingsCollection.insertOne(newBooking); // Insert the new booking into the collection

    return new Response(
      JSON.stringify({ message: "Booked Successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error booking service:", error); // Log the error for debugging
    return new Response(
      JSON.stringify({ message: "Something Went Wrong" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
