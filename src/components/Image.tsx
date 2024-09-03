import Image from 'next/image';


const CustomImage = ({ src, alt, fill }:any) => {
  return (
    <div className={`relative ${fill ? 'aspect-square' : ''}`}>
      <Image src={src} alt={alt} layout={fill ? 'fill' : 'responsive'} />
    </div>
  );
};


export default CustomImage;