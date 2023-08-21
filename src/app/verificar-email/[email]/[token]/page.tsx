"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import Message from "@/components/Message";

import userContext from "@/contexts/userContext";

import type { NextPage } from "next";

interface Params {
  email: string;
  token: string;
}

interface Props {
  params: Params;
}

const VerifyEmail: NextPage<Props> = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { email, token } = params;
  const { setUser } = useContext(userContext);
  const { push } = useRouter();

  const verifyEmail = async () => {
    try {
      const fetchOptions: RequestInit = {
        method: "PUT"
      }

      const response = await fetch(`http://localhost:5000/api/users/verify-email/${email.replace(/[%]{1}[0-9]*/, "@")}/${token}`, fetchOptions);

      if (response.ok) {
        const body = await response.json();
        setUser(body);
        push("/");
      } else {
        const error = await response.text();
        
        throw new Error(error);
      }
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message);
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email === undefined || email === null) {
      alert("O parâmetro 'email' está faltando.")
      return
    }

    if (token === undefined || token === null) {
      alert("O parâmetro 'token' está faltando.")
      return
    }

    void verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div>
        carregando mano
      </div>
    )
  } else if (error !== '') {
    return (
      <Message msg={error} close={() => { setError('') }} />
    )
  }
  return (
    <div>
      email verificado irmao
    </div>
  )
};

export default VerifyEmail;
