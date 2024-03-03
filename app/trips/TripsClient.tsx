'use client'



import { useRouter } from "next/navigation";

import Container from "../Components/Container/container";
import Heading from "../Components/Heading";
import { Safeuser, safeReservations } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../Components/listings/ListingCard";

interface TripsClientProps{
reservation:safeReservations[];
currentUser?:Safeuser |null;

}



const TripsClient:React.FC<TripsClientProps> = ({
reservation,currentUser
}) => {
     const router=useRouter()
     const [deletingId,setDeletingId]=useState('');

     const onCancel=useCallback((id:string)=>{
      setDeletingId(id);

      axios.delete(`/api/reservation/${id}`)
      .then(()=>{
        toast.success("rservation cancel")
        router.refresh();
      }).catch((error)=>{
        toast.error(error?.reseponse?.data?.error)
      })
      .finally(()=>{
        setDeletingId('');
      })
     },[router])
    return ( 
       <Container>
        <Heading
        title="Trips"
        subtitle="Where you've been and where you've going "
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gird-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
        </div>
       </Container>
     );
}
 
export default TripsClient;