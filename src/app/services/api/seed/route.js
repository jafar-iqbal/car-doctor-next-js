import { connectDB } from "@/lib/connect.DB";
import { services } from "@/lib/services";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const servicesCollection = db.collection("services");
  try {
    await servicesCollection.deleteMany();
    const res = await servicesCollection.insertMany(services);
    return NextResponse.json({ message: "Seeded Successfully" });
  } catch (error) {
    return NextResponse.json({ message: "no data found" });
  }
};
