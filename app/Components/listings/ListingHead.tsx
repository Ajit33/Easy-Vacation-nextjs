'use client'

import useCountries from "@/app/hooks/useCountries";
import { Safeuser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import HeartButton from "../HeartButton";

interface ListingHeadProps{
    title:string;
    locationValue:string;
    imageSrc:string;
    id:string;
    currentUser?:Safeuser |null;

}



const ListingHead: React.FC<ListingHeadProps> = ({
    title,locationValue,imageSrc,id,currentUser
}) => {
    const {getByValue}=useCountries();
    const loaction=getByValue(locationValue)
    return ( 
        <>
        <Heading
        title={title}
        subtitle={`${loaction?.region},${loaction?.label}`}
        />
        <div className="w-full h-[60vh] overflow-hidden rounded-lg relative">
         <Image
         alt="Image"
         src={imageSrc}
         fill
         className="object-cover w-full"
         />
         <div className="absolute top-5 right-5">
            <HeartButton
            listingId={id}
            currentUser={currentUser}

            />
           
         </div>
        </div>
        </>
     );
}
 
export default ListingHead;