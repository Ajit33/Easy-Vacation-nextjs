'use client';

import Image from "next/image";


interface AvatarProps{
  src:string | null | undefined
}
const Avtar: React.FC<AvatarProps> = ({
  src
}) => {
    return ( 
      <Image
      className="rounded-full"
      height='30'
      width='30'
      alt="Avtar"
      src={src || "/images/placeholder.jpg"}
      
      />
     );
}
 
export default Avtar;