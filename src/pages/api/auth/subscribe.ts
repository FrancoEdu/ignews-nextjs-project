import { NextApiRequest, NextApiResponse } from "next";
import {query as q} from 'faunadb'
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
    ref:{
        id: string;
    }
    data: {
        stripe_customer_id: string;
    }
}

export default async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        
        const session = await getSession({req}) //dentro dessa req existem os cookies com token

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        ) 

        let customerId = user.data.stripe_customer_id

        if(!customerId){
            const stripeCostumer = await stripe.customers.create({
                email: session.user.email,
            })
    
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    { //quais informações serão atualizadas
                        data: {
                            stripe_costumer_id: stripeCostumer.id,
                        }
                    }
                )
            )

            customerId = stripeCostumer.id
        }

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items:[{
                price: 'price_1MgVqRBkjBpVqxTmM8MitnuX',quantity:1
            }],
            mode:'subscription',
            allow_promotion_codes: true,
            success_url: 'http://localhost:3000/posts',
            cancel_url: 'http://localhost:3000/',
        })

        return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}