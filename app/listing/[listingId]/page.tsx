import ClientOnly from "@/app/Components/ClientOnly";
import EmptyState from "@/app/Components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
interface IParams{
    listingId?:string;
}
const ListingPage =async ({params}:{params:IParams}) => {
    const listing= await getListingById(params)
  const currentUser=await getCurrentUser();
    if(!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return ( 
       <ClientOnly>
         <ListingClient 
          listing={listing}
          currentUser={currentUser}
         
         
         />
       </ClientOnly>
     );
}
 
export default ListingPage;