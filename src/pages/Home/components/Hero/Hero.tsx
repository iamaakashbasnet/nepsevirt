import React from 'react';
import { Button } from 'flowbite-react';

import styles from './Hero.module.css';
import herobg from 'assets/hero-bg.mp4';

const Hero: React.FC = () => {
  return (
    <>
      <div id={styles.videoContainer}>
        <video id={styles.video} src={herobg} autoPlay loop muted />

        <section className="z-20 bg-transparent">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <h1 className="mb-4 font-heading text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
                Paper Trading Platform{' '}
              </span>
              For NEPSE
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-400 sm:px-16 lg:px-48 lg:text-xl">
              Master trading strategies and grow your skills with our risk-free paper trading platform. Join us for
              financial success!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button color="blue">Get Started</Button>
              <Button color="gray">Learn More</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;
