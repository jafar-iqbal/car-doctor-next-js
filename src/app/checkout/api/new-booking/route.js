import { connectDB } from "@/lib/connect.DB";

export const POST = async (req) => {
  const newBooking = await req.json();
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const res = await bookingsCollection.insertOne(newBooking);
    return Response.json({ message: "Booked Successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong" }, { status: 400 });
  }
};
