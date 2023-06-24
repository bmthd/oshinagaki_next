"use client"

import { NextPage } from 'next'
import { useEffect } from 'react';

const RedirectPage:NextPage = () => {

    useEffect(() => {
        window.location.href = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=R1lkampvZkFtalQ4SUg3TWlNeEI6MTpjaQ&redirect_uri=https://oshinagaki.bmth.dev/twitter-webapp/callback&scope=offline.access%20users.read%20follows.read&state=state&code_challenge=challenge&code_challenge_method=plain"
    }, [])
    return <div>Redirecting...</div>
}

export default RedirectPage;