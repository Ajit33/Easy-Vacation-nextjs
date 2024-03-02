'use client'


import Container from "@/app/Components/Container/container";
import { categories } from "@/app/Components/Navbar/Categories";
import ListingHead from "@/app/Components/listings/ListingHead";
import ListingInfo from "@/app/Components/listings/ListingInfo";
import { SafeListing,Safeuser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { BiCategory } from "react-icons/bi";

interface ListingClientsProps{
  reservation?:Reservation[];
  listing:SafeListing &{
    user:Safeuser
  };
  currentUser?:Safeuser| null

}



const ListingClient:React.FC<ListingClientsProps> = ({
    reservation,listing,currentUser
}) => {
    const category=useMemo(()=>{
        return categories.find((item)=>
        item.label===listing.category
        
        )

    },[listing.category])
    return ( 
        <Container>
        <div 
          className="
            max-w-screen-lg 
            mx-auto
          "
        >
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.loactionValue}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 ">
                <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                loactionValue={listing.loactionValue}
                />
            </div>
           </div>
        </div>
      </Container>
     );
}
 
export default ListingClient;