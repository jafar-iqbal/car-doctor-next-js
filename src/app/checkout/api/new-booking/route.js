import { connectDB } from "@/lib/connect.DB";

export const POST = async (req) => {
  const booking = await req.json();
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const newBooking = await bookingsCollection.insertOne(booking);
    return Response.json({ message: "booking successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
