import {fauna}  from '../../services/fauna'
import NextAuth from 'next-auth'
import GithubProvider  from 'next-auth/providers/github'
import {query as q} from 'faunadb'

export default NextAuth({
    providers:[
        GithubProvider ({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                url: 'https://github.com/login/oauth/authorize',
                params:{
                    scope:'read:user'
                },
            },
        }),
    ],
    callbacks:{
        async signIn({user, account, profile}){
            const {email} = user
            


            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            {data:{email}}
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )

                return true
            } catch (error) {
                return false
            }
        },
    }
})