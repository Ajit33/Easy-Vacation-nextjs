"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatr from "../Avtar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/UseRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { Safeuser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
interface UserMenuProps{
 currentUser?:Safeuser | null
}
const UserMenu:React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const registermodal=useRegisterModal();
  const rentModal=useRentModal();
  const loginmodal=useLoginModal();
  
  const onRent=useCallback(()=>{
    if(!currentUser){
     return loginmodal.onOpen();
    }
   rentModal.onOpen();
  },[currentUser,loginmodal,rentModal])


  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Easy-Vacation Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatr src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[20vw] md:3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {
              currentUser?(
                  
            <>
            <MenuItem onClick={()=>{}} lable="My Trips"/>
            <MenuItem onClick={()=>{}} lable="My Favorites"/>
            <MenuItem onClick={()=>{}} lable="My Reservations"/>
            <MenuItem onClick={()=>{}} lable="My Properties"/>
            <MenuItem onClick={rentModal.onOpen} lable="Easy-Vaction my home"/>
            <hr />
            <MenuItem onClick={signOut} lable="Logout"/>

            
          </>
              ):(
            
            <>
              <MenuItem onClick={loginmodal.onOpen} lable="Login"/>
              <MenuItem onClick={registermodal.onOpen} lable="Sign up"/>
            </>
              )}
          </div>
        </div>
      )}
            
    </div>
  );
};

export default UserMenu;
