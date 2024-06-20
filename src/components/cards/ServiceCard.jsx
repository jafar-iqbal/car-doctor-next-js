import Image from 'next/image';
import React from 'react';

const ServiceCard = ({ service }) => {
    const {img, title,price} = service || {};
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl p-2">

            <Image height={120} width={430} src={img} alt={title} className='rounded-lg' />
  <div className="card-body">
                <h2 className="card-title">{title}</h2>

                <div className="card-actions justify-between items-center">
                    <h6 className='text-primary font-semibold'>Price : ${price}</h6>
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    );
};

export default ServiceCard;