'use client'

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
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';
const RegisterModal = () => {
  const loginmodal=useLoginModal();
    const registermodal=useRegisterModal();
    const[isLoading,setIsLoading]=useState(false);
    const {
        register,
        handleSubmit,
        formState:{
        errors,
        },
    }=useForm< FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        },
    });
    const onSubmit:SubmitHandler< FieldValues>=(data)=>{
        setIsLoading(true);
        loginmodal.onOpen();
        axios.post('/api/register',data)

        .then(()=>{
            registermodal.onClose();
        })
        .catch((error)=>{
            toast.error('Somthing Went Wrong ')
        })
        .finally(()=>{
           setIsLoading(false) 
        })
         
        
    }
    const toggle=useCallback(()=>{
      registermodal.onClose();
      loginmodal.onOpen();
      },[loginmodal,registermodal])

  const bodyContent=(
    <div className='flex flex-col gap-4'>
         <Heading
         title="Welcome to Easy-Vacation"
         subtitle='Create an account'
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
        id="name"
        label="Name"
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
            Already have an account ?
        </div>
        <div onClick={toggle} className='text-neutral-700 hover:underline cursor-pointer'>
            Log in
        </div>
        </div>  
    </div>
)
    return ( 
       <Modal
       disabled={isLoading}
       isOpen={registermodal.isOpen}
       title='Register'
       actionLabel='Continue'
       onClose={registermodal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent}
       footer={footerContent}
       />
     );
}
 
export default RegisterModal;