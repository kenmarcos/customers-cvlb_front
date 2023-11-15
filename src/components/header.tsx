import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-20 bg-gradient-cvlb">
      <div className="container h-full">
        <div className="absolute left-1/2 flex h-24 w-60 -translate-x-1/2 items-center bg-background shadow-xl">
          <Link href="/" className="w-full">
            <Image
              src="/cvlb-logo.svg"
              alt="Imagem do logo CVLB"
              width={0}
              height={0}
              sizes="100vw"
              className="h-16 w-full object-contain"
              quality={100}
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
