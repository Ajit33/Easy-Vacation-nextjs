'use client'

import useSearchModal from "@/app/hooks/useSearchModal copy";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";



enum STEPS{
    LOACTION=0,
    DATE=1,
    INFO=2
}
const SearchModal = () => {
    const router=useRouter();
    const params=useSearchParams();
    const searchModal=useSearchModal();

    const [step,setStep]=useState(STEPS.LOACTION)
    const [guestCount,setGuestCount]=useState(1)
    const [roomCount,setRoomCount]=useState(1)
    const [bathroomCount,setBathroomCount]=useState(1)
    const [dateRange,setDateRange]=useState<Range>({
        startDate:new Date()
    })
    return ( 
        <Modal
           isOpen={searchModal.isOpen}
           onClose={searchModal.onClose}
           onSubmit={searchModal.onOpen}
           title="Filters"
           actionLabel="Search"

        />
     );
}
 
export default SearchModal;