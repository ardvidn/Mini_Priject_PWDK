import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {

  return (
    <div className="relative">
      <img
        src={
          'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        alt="Jumbotron Image"
        className="w-full h-full"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Your Jumbotron Title</h1>
        <p className="text-lg">Your Jumbotron subtitle goes here.</p>
      </div>
    </div>
  );
}
