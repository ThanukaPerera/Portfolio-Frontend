
  import { Montserrat } from 'next/font/google';



type SectionTitleProps = {
    title: string;
  };

  
  const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'], // adjust based on what you need
  });
  
  
  export default function SectionTitle({ title }: SectionTitleProps) {
    return (
      <div className={`flex gap-10 items-center py-10 ${montserrat.className}`}>
        <h1 className="text-[5vh] font-semibold text-primaryColor max-sm:text-[4vh]">{title}</h1>
        <div className="w-60 h-[1px] bg-tertiaryColor max-sm:hidden"></div>
      </div>
    );
  }
  