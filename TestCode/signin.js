import React from 'react';
import {providers, signIn, getSession, csrfToken, useSession} from 'next-auth'
import {ProfileNav} from '../components/Navbar/ProfileNav'


export default function SignIn({providers, csrfToken}){
  return(
      <div>
        <ProfileNav/>

        <body>
            <form method="post" action="/api/auth/signin/credentials">
              <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
              <label>Username
                <input type="text" name="username" id="username"/>
              </label>
              <label>Password 
                <input type="password" name="password" id="password"/>
              </label>
              <button type="submit">Sign in</button>


            </form>



        </body>


      </div>

  )
}

SignIn.getInitialProps = async(context) => {
  const {data: session} = useSession();
  // const session = await getSession({ req });
  if (session  && session.accessToken){
    res.writeHead(302, {
      Location: "/profile",
    });
    res.end()
    return;
  }
  return{
    session:undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  }
}