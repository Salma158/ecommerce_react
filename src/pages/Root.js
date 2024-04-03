import { Outlet, useLoaderData, useSubmit } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';


function Root(){
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
      if (!token) {
        return;
      }
  
      if (token === 'EXPIRED') {
        submit(null, { action: '/logout', method: 'post' });
        return;
      }
  
      const tokenDuration = getTokenDuration();
      console.log(tokenDuration);
  
      setTimeout(() => {
        submit(null, { action: '/logout', method: 'post' });
      }, tokenDuration);
    }, [token, submit]);


    return(
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}

export default Root