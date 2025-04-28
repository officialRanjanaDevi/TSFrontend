'use client';
import React,{ useContext,useState,useEffect} from "react";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import { useParams } from "next/navigation";
import axios from "axios";
import NearbyCard from "@/components/productCards/NearbyCard";
import { LocationContext } from "@/lib/LocationContext";
export default function page() {
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
    const {id} = useParams();
    const [location, setLocation] = useContext(LocationContext);
   const [allStores, setAllStores] = useState([]);
   const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

    useEffect(() => {
      if(location.lat && location.long){

  
        const api = `${serverURL}/api/v1/getNearByStores/${id}?latitude=${
          location.lat
        }&longitude=${location.long}&maxDistance=${500000000000}`;
        axios
          .get(api)
          .then((res) => {
            console.log("resssssssssssssssss", res);
            setAllStores(res.data);
          })
          .catch((err) => console.error(err));
        }
    }, [ serverURL,location]);
  
  return <div>
     <FilterMenuLayout setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters}>
        {!allStores? <SkeletonLoader />:
    
                     <div className="mt-4 grid gap-6  grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-2">
                       {allStores.map((item, storeIndex) => (
                         <NearbyCard
                           key={storeIndex}
                           like={item?.rating?.rating}
                           count={item?.rating?.count}
                           imageName="store1"
                           shop={item?.storeName}
                           logo="bxs_offer.png"
                           discount="Flat 20% OFF "
                           text={item?.status}
                           location={item?.address1}
                           distance="- 8km"
                           store={item}
                         />
                       ))}
               
                   </div>}
      </FilterMenuLayout>
      </div>;
}
