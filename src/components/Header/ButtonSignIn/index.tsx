import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function ButtonSignIn(){

    const isUserLoggedIn = true

    return isUserLoggedIn ? (
        <button type="button" className={styles.btnSignIn}>
            <FaGithub color='#04d361'/>
            User.name
            <FiX color='#737380' className={styles.closeIcon} />
        </button>
    ) : (
        <button type="button" className={styles.btnSignIn}>
            <FaGithub color='#eba417'/>
            Sign in with Github
        </button>
    )
}