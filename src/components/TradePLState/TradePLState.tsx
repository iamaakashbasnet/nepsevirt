import { useEffect, useState } from 'react';
import { BsChevronDoubleUp, BsChevronDoubleDown } from 'react-icons/bs';

interface Props {
  diffData: number;
  children: React.ReactNode;
}

const TradePLState = (props: Props) => {
  const [state, setState] = useState('');

  useEffect(() => {
    if (props.diffData > 0) {
      setState('ml-2 flex items-center text-green-500');
    } else if (props.diffData < 0) {
      setState('ml-2 flex items-center text-red-500');
    } else {
      setState('ml-2 flex items-center text-blue-500');
    }
  }, []);

  return (
    <div className={state}>
      ({props.children})
      {props.diffData != 0 &&
        (props.diffData > 0 ? (
          <BsChevronDoubleUp className={`ml-1 animate-bounce`} />
        ) : (
          <BsChevronDoubleDown className={`ml-1 animate-bounce`} />
        ))}
    </div>
  );
};

export default TradePLState;
