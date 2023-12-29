import React from 'react';
import { BsChevronDoubleUp, BsChevronDoubleDown } from 'react-icons/bs';

interface TradePLStateProps {
  diffData: number;
}

const TradePLState: React.FC<TradePLStateProps> = ({ diffData }) => {
  const isPositive = diffData > 0;
  const isNegative = diffData < 0;
  const colorClass = isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : '';

  return (
    <div className={`ml-2 flex items-center ${colorClass}`}>
      {diffData !== 0 &&
        (diffData > 0 ? (
          <>
            ({diffData.toLocaleString('en-IN')})
            <BsChevronDoubleUp className={`ml-1 animate-bounce`} />
          </>
        ) : (
          <>
            ({diffData.toLocaleString('en-IN')})
            <BsChevronDoubleDown className={`ml-1 animate-bounce`} />
          </>
        ))}
    </div>
  );
};

export default TradePLState;
