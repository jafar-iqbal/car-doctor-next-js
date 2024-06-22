import { connectDB } from "@/lib/connect.DB";

export const DELETE = async (req, { params }) => {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");
    try {
        const myBookings = await bookingsCollection.deleteOne({ _id: params.id });
        return Response.json({ message:"deleted the bookings" });
    } catch (error) {
          return Response.json({ message:"something went wrong" });

      }
}