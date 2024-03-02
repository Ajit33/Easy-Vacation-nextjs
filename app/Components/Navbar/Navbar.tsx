'use client';
import Container from "../Container/container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { Safeuser } from "@/app/types";
interface NavbarProps{
   currentUser?:Safeuser | null;
}
const Navbar:React.FC<NavbarProps> = ({
  currentUser
}) => {

  return (
    <div className="fixed w-full  bg-white z-10 shadow-sm opacity ">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
                      flex
                      flex-row
                      items-center
                      justify-between
                      gap-3
                      md:gap-0
                     "
          >
           <Logo />
           <Search />
          <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;