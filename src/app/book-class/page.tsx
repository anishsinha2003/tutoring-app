"use client"
import { auth0 } from "@/lib/auth0";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";


export default function BookClass() {

  // isloadinf here is needed because it takes time to retrieve the user data and
  // you wouldnt want anything to happen while it is loading
  const { user, isLoading } = useUser();

  const router = useRouter();
  console.log(user)
  if (!isLoading && !user) {
    router.push('/');
  }

  return (
    <div>
      Book Class
    </div>
  );
}

