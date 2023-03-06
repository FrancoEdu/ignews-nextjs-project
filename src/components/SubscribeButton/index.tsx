import { Session } from 'inspector'
import { signIn, useSession } from 'next-auth/react'
import { api } from '../../pages/services/api'
import { getStripeJS } from '../../pages/services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps{
    priceId: string,
}

export function SubscribeButton({priceId}:SubscribeButtonProps){

    const {data: session} = useSession() //saber se o usuário está logado

    async function handleSubscribe(){
        if(!session){ //se não estiver logado, redireciona para o github
            signIn('github')
            return
        }

        //criação do checkout session
        try{
            const response = await api.post('auth/subscribe')

            const {sessionId} = response.data;

            const stripe = await getStripeJS()

            await stripe.redirectToCheckout({sessionId : sessionId})
        }catch(err){
            alert(err.message)
        }
    }

    return(
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}> 
            Subscribe now
        </button>
    )
}