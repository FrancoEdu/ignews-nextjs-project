import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn,signOut,useSession } from 'next-auth/react'
import styles from './styles.module.scss'

export function ButtonSignIn(){

    const{data: session} = useSession()

    console.log(session)

    return session ? (
        <button type="button" className={styles.btnSignIn}>
            <FaGithub color='#04d361'/>
            {session.user.name}
            <FiX color='#737380' className={styles.closeIcon} onClick={()=> signOut()}/>
        </button>
    ) : (
        <button type="button" className={styles.btnSignIn} onClick={() => signIn('github')}>
            <FaGithub color='#eba417'/>
            Sign in with Github
        </button>
    )
}