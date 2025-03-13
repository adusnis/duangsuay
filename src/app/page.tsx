import styles from "./page.module.css";
import Banner from '@/components/Banner'
import Image from 'next/image'
import Card from "@/components/Card";
export default function Home() {
  return (
    <main>
      <Banner/>
      <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
        <Card venueName="bloom" imgSrc="/img/bloom.jpg"/>
        <Card venueName="grandtable" imgSrc="/img/grandtable.jpg" />
        <Card venueName="sparkspace" imgSrc="/img/sparkspace.jpg" />
      </div>
    </main>
  );
}
