"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DealsCard({ image, title, offer, id }) {
  const router = useRouter();
  const handleClick = () => {
    // window.location.href=`/nearByStore/store?storeId=${id}`
    router.push(`/nearByStore/store?storeId=${id}`);
  };

  const sellerId = "64ca8e852eb496c7f2bf4e50";
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const [allStores, setAllStores] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the first API
    axios
      .post(`${serverURL}/api/v1/${sellerId}/stores`)
      .then((response) => {
        setAllStores(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });

    // Fetch data from the second API
    axios
      .get(
        `${serverURL}/api/v1/getPopularBrand`
      )
      .then((response) => {
        setData(response.data);
        //console.log('setData',response.data)
      })
      .catch((error) => {
        console.error("Error fetching brand deals:", error);
      });
  }, [sellerId, serverURL]);
  return (
    <>
      <div
        className="flex px-1 md:mb-6 mb-4 w-[60vw] md:w-fit m-0 hover:cursor-pointer text-gray-900"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center border-4 h-[180px] w-[170px] md:h-[200px] md:w-[225px] my-2">
          <img
            width={200}
            height={200}
            src={image}
            alt="Deal imgee"
            className="w-52 h-52"
          />
          <div className="relative w-[80%] border-4  rounded -mt-10">
            <div className="p-1 bg-white shadow-md">
              <div className="mt-1 h-[44px] overflow-hidden font-medium uppercase text-xs justify-center flex  md:text-base">
                {title}
              </div>
              <div className="mt-2 h-[20px] overflow-hidden text-center text-xs text-gray-600">
                {offer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function DealsCard({ image, title, offer, id }) {
//     const sellerId = '64ca8e852eb496c7f2bf4e50';
//     const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

//     const [allStores, setAllStores] = useState([]);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         // Fetch data from the first API
//         axios.post(`${serverURL}/api/v1/${sellerId}/stores`)
//             .then((response) => {
//                 setAllStores(response.data.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching stores:', error);
//             });

//         // Fetch data from the second API
//         axios.get('https://trialshopy-backend-rk8d.onrender.com/api/v1/getPopularBrand')
//             .then((response) => {
//                 setData(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching brand deals:', error);
//             });
//     }, [sellerId, serverURL]);

//     // Create a function to group data by category or brand
//     const groupBy = (arr, key) => {
//         return arr.reduce((acc, item) => {
//             const category = item[key];
//             acc[category] = [...(acc[category] || []), item];
//             return acc;
//         }, {});
//     };

//     // Group stores by brand
//     const storesByBrand = groupBy(allStores, 'brand');
//     // Group brands by category
//     const brandsByCategory = groupBy(data, 'category');

//     return (
//         <>
//             {/* Display data grouped by brand and category */}
//             <div className="api-data">
//                 {Object.keys(storesByBrand).map((brand) => (
//                     <div key={brand}>
//                         <h3>{brand}</h3>
//                         <ul>
//                             {storesByBrand[brand].map((store) => (
//                                 <li key={store._id}>{store.name}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//                 {Object.keys(brandsByCategory).map((category) => (
//                     <div key={category}>
//                         <h3>{category}</h3>
//                         <ul>
//                             {brandsByCategory[category].map((brand) => (
//                                 <li key={brand._id}>
//                                     <div>
//                                         <strong>{brand.name}</strong>
//                                     </div>
//                                     <div>
//                                         <img src={brand.logo.url} alt={brand.name} />
//                                     </div>
//                                     {/* Add more details as needed */}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }
