import styles from './banner.module.css'
import Image from 'next/image';
export default function Banner (){
    return (
        <div className={styles.banner}>
            <Image src={'/img/banner.jpg'} 
            alt='cover' 
            fill={true}
            priority
            objectFit='cover'/>
            <div className={styles.bannerText}>
                <h1>where every event finds its venue</h1>
                <h3 style={{ marginTop: "10px" }}>Finding the perfect venue has never been easier. Whether It's a wedding corperate event, or private party, we connect people to the perfect place.</h3>
            </div>
        </div>
    );
}