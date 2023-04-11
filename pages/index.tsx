import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MintButton from "../components/MintButton";
import Link from 'next/link';
import Toggle from '../components/Toggle';
import { getReleaseDetails } from '../lib/getReleaseDetails';
import getIpfsLink from "../lib/getIpfsLink";
import { BiLinkExternal } from "react-icons/bi";

const Home: NextPage = (props: any) => {
  const [creditCard, setCreditCard] = useState(false);
  const [mintQuantity, setMintQuantity] = useState(1);
  const [videoFailed, setVideoFailed] = useState(false);

  return <>
    <Head>
      <title>{props.contractData.data.name}</title>
      <meta
        name="description"
        content={props.contractData.metadata.description}
      />
      <link rel="icon" href={getIpfsLink(props.contractData.metadata.image)} />
    </Head>

    <main className={`${styles.main}`}>
      <div className='grid md:grid-cols-2 grid-cols-1 place-items-center w-full mt-[10vh] sm:mt-0'>
        <div className='md:border-r border-black w-full'>
          <h1 className='sm:text-6xl text-5xl p-8 flex-items-center border-b border-black'>{props.contractData.data.name}</h1>
          <div className='font-[300] p-8 overflow-y-scroll sm:border-b border-black text-sm'>
            {props.contractData.metadata.description}
            <div className='w-full flex flex-wrap justify-between gap-4 mt-8 hidden sm:inline-flex'>
              <div className='relative'>
                <div className='text-center uppercase text-green-500'>Live Now</div>
                <Image height={130} width={130} className="cursor-pointer hover:drop-shadow-lg" src={getIpfsLink(props.contractData.metadata.image)} alt={'nft'} />
              </div>
              <div className='relative'>
                <div className='text-center uppercase'>Upcoming</div>
                <div className='absolute w-full h-full bg-white/80 text-center pt-4 text-3xl z-20 text-black'>?</div>
                <Image height={130} width={130} className="cursor-pointer hover:drop-shadow-lg" src={getIpfsLink(props.contractData.metadata.image)} alt={'nft'} />
              </div>
              <div className='relative'>
                <div className='text-center uppercase'>Upcoming</div>
                <div className='absolute w-full h-full bg-white/80 text-center pt-4 text-3xl z-20 text-black'>?</div>
                <Image height={130} width={130} className="cursor-pointer hover:drop-shadow-lg" src={getIpfsLink(props.contractData.metadata.image)} alt={'nft'} />
              </div>
              <div className='relative'>
                <div className='text-center uppercase'>Upcoming</div>
                <div className='absolute w-full h-full bg-white/80 text-center pt-4 text-3xl z-20 text-black'>?</div>
                <Image height={130} width={130} className="cursor-pointer hover:drop-shadow-lg" src={getIpfsLink(props.contractData.metadata.image)} alt={'nft'} />
              </div>
            </div>
          </div>
          <div className='px-8 py-4 sm:border-none border-y border-black'>
            <div className='grid grid-cols-3 gap-4'><p>Follow on Lens:</p><a href='https://www.lensfrens.xyz/annikarose.lens/follow' target='_blank'  className='text-green-500 flex gap-1 items-center justify-end' rel="noreferrer">Annika Rose<BiLinkExternal /></a><a href='https://www.lensfrens.xyz/nvakcollective.lens/follow' className='text-green-500 flex gap-1 items-center justify-end' target='_blank' rel="noreferrer">Nvak Collective <BiLinkExternal /></a></div>
            <div className='grid grid-cols-2 gap-4'><p>Price:</p><p className='text-right'>{props.contractData.data.tokenPrice} ETH</p></div>
            <div className='grid grid-cols-2 gap-4'>
              <p>Minted:</p>
              <p className='text-right'>{props.contractData.data.totalSupply} / {props.contractData.data.MAX_TOKENS > 99999999 ? "Open" : props.contractData.data.MAX_TOKENS}</p>
            </div>
          </div>
        </div>

        <div className='sm:px-8 px-4 w-full flex items-center justify-center my-4 sm:my-0'>
          <div className='space-y-4'>
            {videoFailed ? 
            <Image height={460} width={460} className="drop-shadow-md max-h-[460px] w-full rounded-md" src={getIpfsLink(props.contractData.metadata.image)} alt={'nft'} /> :
            <video controls className="drop-shadow-md max-h-[460px] w-full rounded-md" onError={() => setVideoFailed(true)}>
              <source src={getIpfsLink(props.contractData.metadata.animation_url)} />
              Your browser does not support the video tag.
            </video>}
            <div className='max-w-[350px] mx-auto container'>
              <MintButton 
                chainId={props.contractData.chainId} 
                contractAddress={props.contractData.address} 
                price={parseFloat(props.contractData.data.tokenPrice)} 
                setQuantity={setMintQuantity} 
                quantity={mintQuantity} 
                decentLink={'https://hq.decent.xyz/1/Editions/0xbeCA7aBd9590257c2Aaa8671Be0ac4d6b713EDAC'} 
                state={creditCard} 
                clientId={process.env.NEXT_PUBLIC_CROSSMINT_CLIENTID}
                activeChain={1}
              />
              {/* Crossmint not yet verified */}
              {/* <Toggle state={creditCard} setState={setCreditCard} /> */}
            </div>
          </div>
        </div>
      </div>

      {/* would appreciate the footer s/o but do what you will 🤝 */}
      <footer className='sm:fixed bottom-0 w-full h-[10vh] border-t border-black justify-center flex items-center bg-white z-50'>
        <p className='pr-2 tracking-widest text-sm font-[400]'>Powered by </p>
        <Link href="http://decent.xyz/" className='pt-1'>
          <Image src='/images/decent.png' height={12} width={85} alt='Decent 💪' />
        </Link>
      </footer>
    </main>
  </>
};

export default Home;

export async function getStaticProps() {
  const CHAINID = 1;
  const CONTRACT_ADDRESS = '0xbeCA7aBd9590257c2Aaa8671Be0ac4d6b713EDAC';
  let contractData = await getReleaseDetails(CHAINID, CONTRACT_ADDRESS)
  return {
    props: {
      contractData
    },
    revalidate: 20
  };
};