import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
    session: { strategy: "jwt" },
    providers:[
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID||'',
            clientSecret: process.env.TWITTER_CLIENT_SECRET||'',
            version: '2.0',
        })
    ],
    callbacks: {
        jwt:async ({token, user, account, profile,}) => {
            console.log('jwt', token, user, account, profile);
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        }
    }
})