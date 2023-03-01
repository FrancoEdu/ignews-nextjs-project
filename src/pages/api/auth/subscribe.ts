import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../../services/stripe";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        
        const session = await getSession({req})

        const stripeCostumer = await stripe.customers.create({
            email: session.user.email,
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCostumer.id,
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

        return res.status(200).json({sessionId: stripeCheckoutSession})
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}