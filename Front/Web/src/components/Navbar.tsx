import React from 'react';
import Link from 'next/link';
import Logo from './svg/Logo';
import { UserIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-white p-6 text-black bg-gradient-to-bl from-neutral-200 to-white">
      <div className=" flex justify-between items-center">
        <div className="grow">
          <Link href="/" className='flex items-center'>
            <div className='w-28 cursor-pointer'>
              <Logo color='black' />
            </div>
            <span className="pl-5 font-extrabold text-5xl">TITS</span>
          </Link>
        </div>

        <div className="flex space-x-16 grow cursor-pointer font-bold text-2xl -translate-x-16">
          <Link href="/dashboard/services" className='hover:text-neutral-600 duration-300'>
            <span className="">Services</span>
          </Link>
          <Link href="/dashboard/create" className='hover:bg-neutral-700 duration-300 bg-black rounded-full text-white p-3 pr-9 pl-9 text-xl'>
            <span className="">Create</span>
          </Link>
          <Link href="/dashboard/myareas" className='hover:text-neutral-600 duration-300'>
            <span className="">My Areas</span>
          </Link>
        </div>

        <div className="mr-6">
          <Link href="/dashboard/profile">
            <div className="cursor-pointer w-12">
              <UserIcon className='text-black hover:text-neutral-600' data-testid="user-icon" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
