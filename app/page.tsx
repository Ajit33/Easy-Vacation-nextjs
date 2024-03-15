import Image from "next/image";
import ClientOnly from "./Components/ClientOnly";
import Container from "./Components/Container/container";
import EmptyState from "./Components/EmptyState";
import getListings, { iListingsParams } from "./actions/getListing";
import ListingCard from "./Components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps{
  searchParams:iListingsParams
}



const Home=async({searchParams}:HomeProps)=> {
  const listings = await getListings(searchParams);


  const currentUser=await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            mt-[40px]
          "
        >
          {listings.map((listing) => (
            <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}


export default Home;