import EmptyState from "../Components/EmptyState";
import ClientOnly from "../Components/ClientOnly";


import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";

const ListingPage= async()=>{
    const listings=await getFavoriteListing()
    const currentUser=await getCurrentUser()

    if(listings.length===0){
        return (
            <ClientOnly>
                <EmptyState
                title="No favorites found"
                subtitle="Looks like You don't have any favorites item"
                />
            </ClientOnly>
        )
    }
    return(
       <ClientOnly>
        <FavoritesClient
        listings={listings}
        currentUser={currentUser}
        />
       </ClientOnly>
    )
    
}
export default ListingPage;