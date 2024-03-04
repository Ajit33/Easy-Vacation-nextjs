
import EmptyState from "../Components/EmptyState";
import ClientOnly from "../Components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ReservationsClient from "./ReservationClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return (
        <ClientOnly> 
          <EmptyState
            title="Unauthorized"
            subtitle="Please login"
          />
        </ClientOnly>
      )
    }
  
    const reservations = await getReservation({ authorId: currentUser.id });
  
    if (reservations.length === 0) {
      return (
        <ClientOnly>
          <EmptyState
            title="No reservations found"
            subtitle="Looks like you have no reservations on your properties."
          />
        </ClientOnly>
      );
    }
  
    return (
      <ClientOnly>
        <ReservationsClient
          reservation={reservations}
          currentUser={currentUser}
        />
      </ClientOnly>
    );
}

export default ReservationsPage;
