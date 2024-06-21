import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faInstagram, faLinkedin, faGithub,  } from '@fortawesome/free-brands-svg-icons'


function Footer() {
  return (
    <>
      <footer className='min-h-ful event-main-div'>
      <div className='bg-black h-auto flex flex-col  px-5 py-5 sm:flex-row'>
        <p className='text-white sm:w-2/4 flex justify-center items-center sm:justify-start'>2024 © Akash Kumar Tiwary</p>
        <div className='flex sm:w-2/4 justify-evenly mt-2 mb-1'>
        <li className= 'text-white list-none px-1 hover:scale-125 hover:text-[#4889f2] transition-all'><a target='_blank' 
        href={`https://www.facebook.com/updatesbyakash`}><FontAwesomeIcon icon={faFacebook} size="xl"/></a></li>
        <li className= 'text-white list-none px-1 hover:scale-125 hover:text-[#4889f2] transition-all'><a target='_blank' 
        href={`https://www.instagram.com/akashdidwhat/`}><FontAwesomeIcon icon={faInstagram} size="xl"/></a></li>
        <li className= 'text-white list-none px-1 hover:scale-125 hover:text-[#4889f2] transition-all'><a target='_blank' 
        href={`https://www.linkedin.com/in/akashkt10172/`}><FontAwesomeIcon icon={faLinkedin} size="xl"/></a></li>
         <li className= 'text-white list-none px-1 hover:scale-125 hover:text-[#4889f2] transition-all'><a target='_blank' 
        href={`https://twitter.com/tweetsbyakash/`}><FontAwesomeIcon icon={faTwitter} size="xl"/></a></li>
        <li className= 'text-white list-none px-1 hover:scale-125 hover:text-[#4889f2] transition-all'><a target='_blank' 
        href={`https://github.com/AkashKT10172/`}><FontAwesomeIcon icon={faGithub} size="xl"/></a></li>
        </div>
      </div>
      </footer>
    </>
  );
}

export default Footer;