import EmptyState from "../Components/EmptyState";
import ClientOnly from "../Components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";



const TripsPage=async ()=>{
    const currentUser=await getCurrentUser();
  if(!currentUser){
    return(
        <ClientOnly>
            <EmptyState 
            title="Unauthorized"
            subtitle="please login"
            />
        </ClientOnly>
    )
  }   
  const reservations=await getReservation(
    {
        userId:currentUser.id
    }
  );
  if(reservations.length===0){
    return(
        <ClientOnly>
            <EmptyState  
            title="No trips found"
            subtitle="Looks Like you haven't reserved any trip."
            
            />
        </ClientOnly>
    )
  }
  return(
    <ClientOnly>
        <TripsClient
        reservation={reservations}
        currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default TripsPage;