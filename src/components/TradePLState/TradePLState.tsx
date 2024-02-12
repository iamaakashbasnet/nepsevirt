import { BsChevronDoubleUp, BsChevronDoubleDown } from 'react-icons/bs';

interface TradePLStateProps {
  diffData: number;
}

const TradePLState = ({ diffData }: TradePLStateProps) => {
  const colorClass = diffData > 0 ? 'text-green-500' : diffData < 0 ? 'text-red-500' : '';

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
