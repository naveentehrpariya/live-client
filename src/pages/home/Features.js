import React, { useState } from 'react';
import feature from '../../img/features.png';
import useFetch from '../../hooks/useFetch';

export default function Features() {

    const { loading, data  } = useFetch({url:'/all-features', type:"user"});
    const [opened, setOpened] = useState(0);
    const ITEM = ({ item, i }) => { 
        const openItem = () => {
            if (opened === i) {
                setOpened(null); // Close the currently opened item
            } else {
                setOpened(i); // Open the clicked item
            }
        };

        return (
            <>
                <style>{`
                    .feature-item-${i} {opacity: 0; transition: 0.9s; max-height: 0px; overflow: hidden; }
                    .feature-item-${i}.open { opacity: 1; transition: 0.9s; max-height: 300px; overflow: visible; }
                `}</style>
                <div className="mb-6 transition-all duration-200 bg-dark1 rounded-[20px] cursor-pointer">
                    <button onClick={openItem} type="button" className="flex items-center justify-between w-full p-6">
                        <span className="flex text-start pe-3 text-[19px] font-semibold text-white font-mona"> {item.title} </span>
                        <svg
                            className={`w-6 h-6 text-gray-400 ${opened === i ? 'rotate-180' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className={`feature-item-${i} ${opened === i ? 'open' : ''}`}>
                        <div className='fitem text-gray-500 pt-0 p-6'>
                            <p className="text-[17px]">{item.description}</p>
                            <div className="turbo-gradient mt-8"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
        {data && data.length > 0 ? 
        <div id="features" className="features py-24">
            <div className="container m-auto">
                <h2 className="heading-md text-center">
                    Explore Our <span className="text-main">Feature</span>
                </h2>
                <p className="text-gray-400 text-center text-[18px] mt-2">
                    We have many features for you to use in live stream
                </p>
                <div className="features-cols mt-10 xl:mt-16 xl:grid grid-cols-2 gap-4">
                    <div className="features-faq">
                        {data &&
                            data.map((item, index) => {
                                return <div key={`feature-item-${index}`}><ITEM i={index} item={item} /></div>;
                            })}
                    </div>
                    <div className="features-img xl:ps-[30px]">
                        <img src={feature} alt="features-img" className="w-full" />
                    </div>
                </div>
            </div>
        </div> 
        : ''}
        </>
    );
}