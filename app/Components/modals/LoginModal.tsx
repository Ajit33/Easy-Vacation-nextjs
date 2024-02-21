'use client'
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback,useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/UseRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
const LoginModal = () => {
     const router=useRouter();
    const registermodal=useRegisterModal();

    const loginmodal=useLoginModal();

    const[isLoading,setIsLoading]=useState(false);
    const {
        register,
        handleSubmit,
        formState:{
        errors,
        },
    }=useForm< FieldValues>({
        defaultValues:{
            email:'',
            password:''
        },
    });
    const onSubmit:SubmitHandler< FieldValues>=(data)=>{
        setIsLoading(true);
     signIn('credentials',{
      ...data,
      redirect:false,

     })
     .then((callback)=>{
      setIsLoading(false);
      if(callback?.ok){
        toast.success('Logged in');
        router.refresh();
        loginmodal.onClose();
      }
      if(callback?.error){
        toast.error(callback.error);
      }
     })
         
        
    }
 const toggle=useCallback(()=>{
 loginmodal.onClose();
 registermodal.onOpen();
 console.log("button clicked")
 },[loginmodal,registermodal])



  const bodyContent=(
    <div className='flex flex-col gap-4'>
         <Heading
         title="WelCome back"
         subtitle='Login to your Account'
         />
          <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

const footerContent=(
    <div className='flex flex-col gap-4 mt-3'>
         <hr />
      <Button
      outline
      label="Continue with Google"
      icon={FcGoogle}
      onClick={()=>signIn('google')}
      />   
      <Button
      outline
      label="Continue with Github"
      icon={AiFillGithub}
      onClick={()=>signIn('github')}
      /> 
      <div className='text-neutral-500 text-center mt-4 font-light flex flex-row gap-2 items-center justify-center'>
        <div>
            First Time in Easy-Vacation?
        </div>
        <div onClick={toggle} className='text-neutral-700 hover:underline cursor-pointer'>
            Create an account
        </div>
        </div>  
    </div>
)
    return ( 
       <Modal
       disabled={isLoading}
       isOpen={loginmodal.isOpen}
       title='Login'
       actionLabel='Continue'
       onClose={loginmodal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent}
       footer={footerContent}
       />
     );
}
 
export default LoginModal;