

import prisma from "@/app/libs/prismadb";

export interface iListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
   loactionValue?: string;
    category?: string;
  }
  

export default async function getListings(params: iListingsParams) {
  try {
    const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, loactionValue, category } = params;
    let query: any = {};
    
    if (userId) {
      query.userId = userId;
    }
    
    if (category) {
      query.category = category;
    }
    
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      };
    }
    
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      };
    }
    
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      };
    }
    if (loactionValue) {
        query.loactionValue = loactionValue;
      }
    
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: {
                  gte:startDate
                },
                startDate: {
                  lte: startDate
                }
              },
              {
                startDate: {
                  lte: endDate
                },
                endDate: {
                  gte: endDate
                }
              }
            ]
          }
        }
      };
    }
    
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    
    return safeListings;
  } catch (error:any) {
    throw new Error(error);
  }
}
