import { connectDB } from "@/lib/connect.DB";

export const GET = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const myBookings = await bookingsCollection.find({ email: params.email }).toArray();
    return Response.json({ myBookings });
  } catch (error) {
    console.log(error.message);
  }
};
