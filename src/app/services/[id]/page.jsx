import { getServicesDetailsFromDB } from '@/services/getServices';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
    title: "Service Details",
    description: "Service Details Page",
};

const Page = async ({ params }) => {
  let details;

  try {
    details = await getServicesDetailsFromDB(params.id);
  } catch (error) {
    console.error("Failed to fetch service details:", error);
    return (
      <div className="w-11/12 mx-auto my-10">
        <h1 className="text-3xl font-bold text-red-600">Failed to load service details.</h1>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="w-11/12 mx-auto my-10">
        <h1 className="text-3xl font-bold text-red-600">Service details not found.</h1>
      </div>
    );
  }

  const { _id, title, description, img, price, facility } = details.service;

  return (
    <div className="w-11/12 mx-auto my-10">
      <div>
        <div className="relative h-72">
          <Image
            className="absolute h-72 w-full left-0 top-0 object-cover"
            src={img}
            alt={title}
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 100vw, 720px"
          />
          <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
            <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
              Details of {title}
            </h1>
          </div>
        </div>

        <div className="p-10 bg-gray-100">
          <h2 className="text-3xl font-bold text-orange-600">{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="my-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {facility.map((item, index) => (
              <div
                className="bg-rose-100 p-4 border-t-4 border-t-rose-500 rounded-xl"
                key={index}
              >
                <h2 className="text-xl font-bold">{item?.name}</h2>
                <p>{item?.details}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-100">
            <Image
              className="w-full object-cover h-40"
              src='/assets/images/checkout/checkout.png'
              alt="checkout service"
              width={400}
              height={400}
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="flex my-4">
              <h2 className="text-xl font-bold">Price: </h2>
              <p className="text-2xl text-rose-500">${price}</p>
            </div>
            <Link href={`/checkout/${_id}`}>
              <button className="bg-rose-500 px-3 py-2 rounded-lg mt-2 w-full">Check out</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
