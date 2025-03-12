import styles from './card.module.css'
import Image from 'next/image';
export default function Card(){
    return(
        <div className={styles.card}>
            <div className={styles.cardimg}>
                <Image src={'/img/product.jpg'}
                alt='Product Picture'
                fill={true}
                objectFit='cover'
                />
            </div>
            <div className={styles.cardtext}>Room 1</div>
        </div>
    );
}