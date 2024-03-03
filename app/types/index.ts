import {Listing, Reservation, User } from "@prisma/client"
export type SafeListing=Omit<
Listing,
"createdAt"
>&{
    createdAt:string;
}
export type safeReservations=Omit<
 Reservation,
 "createdAt" | "startDate" | "endDate"
>&{
    createdAt:string;
    startDate:string;
     endDate:string;
     listing:SafeListing;
}

export type Safeuser=Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt:string;
    updatedAt:string;
    emailVerified:string |null;
}
