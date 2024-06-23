"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Page = ({ params }) => {
  const { data: sessionData } = useSession();
  const [booking, setBooking] = useState(null);

  const loadBooking = async () => {
    try {
      const bookingDetail = await fetch(
        `http://localhost:3000/my-bookings/api/booking/${params.id}`
      );
      if (!bookingDetail.ok) throw new Error("Failed to fetch booking details");
      const data = await bookingDetail.json();
      setBooking(data.res);
    } catch (error) {
      toast.error("Error loading booking data");
    }
  };

  const handleUpdateBooking = async (event) => {
    event.preventDefault();
    const updatedBooking = {
      date: event.target.date.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/my-bookings/api/booking/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedBooking),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Updated Successfully");
        loadBooking(); // Refresh booking details after update
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }
    } catch (error) {
      toast.error("Error updating booking");
    }
  };

  useEffect(() => {
    if (params?.id) {
      loadBooking();
    }
  }, [params]);

  return (
    <div className="container mx-auto">
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src={"/path/to/your/image.jpg"} // Provide a valid image path or URL
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            Update Booking
          </h1>
        </div>
      </div>
      <div className="my-12 bg-slate-300 p-12">
        <form onSubmit={handleUpdateBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={sessionData?.user?.name || ""}
                type="text"
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                defaultValue={booking?.date || ""}
                type="date"
                name="date"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                defaultValue={sessionData?.user?.email || ""}
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
                defaultValue={booking?.price || ""}
                readOnly
                type="text"
                name="price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                defaultValue={booking?.phone || ""}
                required
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                defaultValue={booking?.address || ""}
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
