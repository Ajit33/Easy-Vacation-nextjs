'use client'

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";




enum STEPS{
    CATEGORY=0,
    LOACTION=1,
    INFO=2,
    IMAGE=3,
    DESCRIPTION=4,
    PRICE=5,

}





const RentModal = () => {
    const rentModal=useRentModal();
   const[steps,setSteps]=useState(STEPS.CATEGORY)

   const {
     register,
     handleSubmit,
     setValue,
     watch,
     formState:{
        errors,
     },
     reset
   }=useForm<FieldValues>({
    defaultValues:{
       category:'',
       location:null,
       guestCount:1,
       roomCount:1,
       bathroomCount:1,
       imagesrc:'',
       price:1,
       title:'',
       description:'',
    }
   });
   const category=watch('category');
   const location=watch('location');
  
   const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);



   const setCustomValue=(id:string ,value:any)=>{
    setValue(id,value,{
      shouldDirty:true,
      shouldValidate:true,
      shouldTouch:true,
    })
   }

   const onBack=()=>{
    setSteps((value)=>value-1);
   }
   const onNext=()=>{
    setSteps((value)=>value+1);
   }

   const actionLabel=useMemo(()=>{
     if(steps===STEPS.PRICE){
        return 'Create'
     }
     return 'Next';
   },[steps])

   const secondaryActionLabel=useMemo(()=>{
    if(steps===STEPS.CATEGORY){
        return undefined
    }
    return 'Back';
   },[steps])


   let bodyContent=(
    <div className="flex flex-col gap-8">
        <Heading
        title="Which of these best describes your place ?"
        subtitle="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {
                categories.map((item)=>(
                  <div key={item.label} className="col-span-1">
                   <CategoryInput
                   icon={item.icon}
                   label={item.label}
                   selected={category== item.label}
                   onClick={(category)=>setCustomValue('category',category)}

                   />
                  </div>
                ))
            }
        </div>
    </div>
   )

   if (steps === STEPS.LOACTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />
        <Map center={location?.latlng} />
      </div>
    );
  }



    return ( 
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={steps===STEPS.CATEGORY ?undefined:onBack}
        title="Easy-Vacation your Home"
        body={bodyContent}
        />
     );
}
 
export default RentModal;
