import { Collection } from '@/components/shared/Collection'
import { navLinks } from '@/constants'
import { getAllImages } from '@/lib/actions/image.actions'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})
  return (
    <>
    <div>
      <SignedOut>
          <SignInButton />
        </SignedOut>
    </div>
      <section className='home'>
         <h1 className='home-heading'>Let Your Imagination Soar With Imaginary</h1>
         <ul className='flex-center w-full gap-20 mt-4'>
          {navLinks.slice(1,5).map((link)=>(
            <Link
            key={link.route}
            href={link.route}
            className='flex-center flex-col gap-2'>
              <li className='bg-white rounded-full p-4 w-fit'>
                <Image src={link.icon} alt='image' width={24} height={24}/>
              </li>
              <p className='p-14-medium text-white text-center'>{link.label}</p>
            </Link>
          ))}
         </ul>
      </section>
      <section className='sm:mt-12'>
      <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
    
  )
}

export default Home
