"use client"
import React, { useEffect, useState } from "react";
import ServiceCard from "../cards/ServiceCard";
import { getServicesFromDB } from "@/services/getServices";



const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesFromDB();
        console.log(data); // Check the structure of the fetched data
        setServices(data.services || []); // Make sure to handle the data structure correctly
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-slate-800 min-h-screen mt-12">
      <div className="text-center container mx-auto">
        <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
        <h2 className="text-5xl">Our Services Area</h2>
        <p>
          The majority have suffered alteration in some form, by injected
          humour, or randomized words which do not look even slightly
          believable.{" "}
        </p>
      </div>

      <div className="container mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard service={service} key={service._id} />
          ))
        ) : (
          <div>No services available.</div>
        )}
      </div>
    </div>
  );
};

export default Services;
