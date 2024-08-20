import { lazy } from 'react';
import { Allotment } from 'allotment';

const Portfolio = lazy(() => import('pages/Portfolio'));
const Trade = lazy(() => import('pages/Trade'));

const TradingPanel = () => {
  return (
    <div className="h-screen">
      <h1 className="mb-5 font-heading text-3xl">Trading Panel</h1>
      <Allotment vertical separator>
        <Allotment.Pane>
          <div className="h-full w-full overflow-auto">
            <Trade />
          </div>
        </Allotment.Pane>
        <Allotment.Pane>
          <div className="h-full w-full overflow-auto pt-5">
            <Portfolio />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default TradingPanel;
