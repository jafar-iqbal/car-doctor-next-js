"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (status === "authenticated" && session?.user?.email) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/${session.user.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data.myBookings);
      } catch (error) {
        console.error("Error loading bookings:", error);
        toast.error("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/booking/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete booking");
      const result = await res.json();
      if (result?.res?.deletedCount > 0) {
        toast.success(result.message);
        loadData();
      } else {
        toast.error("Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src="/assets/images/about_us/parts.jpg"
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            My Bookings
          </h1>
        </div>
      </div>
      <div className="mt-12">
        <div className="overflow-x-auto">
          <table className="table bg-slate-300">
            <thead>
              <tr>
                <th></th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.length ? (
                bookings.map(({ serviceTitle, _id, date, price }, index) => (
                  <tr key={_id}>
                    <th>{index + 1}</th>
                    <td>{serviceTitle}</td>
                    <td>{price}</td>
                    <td>{date}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <Link href={`/my-bookings/update/${_id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>
                        <button
                          onClick={() => handleDelete(_id)}
                          className="btn btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
