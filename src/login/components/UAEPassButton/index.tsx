import buttonIcon from '../../assets/uaepass.svg'
import { ReactSVG } from 'react-svg'
import styles from './UAEPassButton.module.scss'
interface UAEPassButtonProps {
    msg: any;
    provider: any;
}

const UAEPassButton = ({msg, provider}: UAEPassButtonProps) => {
  console.log(provider, 'providerrr')
  return (
    <button tabIndex={6} className={styles['btn']} onClick={() => window.open(provider?.loginUrl, '_self')}>
        <ReactSVG src={buttonIcon}/>
        {msg('loginUAE')}
    </button>
  )
}

export default UAEPassButton