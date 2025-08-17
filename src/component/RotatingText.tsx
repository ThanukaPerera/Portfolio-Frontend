import { RotatingText } from '@/components/ui/shadcn-io/rotating-text';

interface RotatingTextDemoProps {
  data: string;
}

const RotatingTextDemo = ({ data }: RotatingTextDemoProps) => {
  const arr = data.split("|").map(item => item.trim());
  console.log(arr);
  
  return (
    <RotatingText
      className="text-2xl font-semibold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-800 bg-clip-text text-transparent"
      text={arr}
      duration={3000}
      transition={{ duration: 0.2, ease: 'anticipate' }}
    />
  );
};

export default RotatingTextDemo;