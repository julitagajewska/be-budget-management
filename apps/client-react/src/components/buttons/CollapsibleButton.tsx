import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CaretDown, Exchange } from '../icons/basil/index.ts';
import Typography from '../typography/Typography.tsx';
import IconButton from './IconButtonOld.tsx';

const CollapsibleButton = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-row items-center justify-between">
        <IconButton handleClick={() => {}} variant="transparent">
          <button type="button" onClick={() => navigate('transactions')} className="flex flex-row items-center gap-2">
            <Exchange size="small" />
            <Typography variant="paragraph2">Transactions</Typography>
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={`${
              collapsed ? 'rotate-0' : 'rotate-180'
            } w-6 h-6 flex flex-row items-center justify-center transition-all
            duration-100 ease-out rounded-full opacity-50 hover:opacity-100`}
          >
            <CaretDown size="medium" />
          </button>
        </IconButton>
      </div>

      <div
        className={`${
          collapsed ? 'h-0 opacity-0 top-[-30px] pointer-events-none' : 'h-fit opacity-100 top-0'
        } transition-all duration-300 ease-out pl-2 relative`}
      >
        <IconButton handleClick={() => navigate('incomes')} variant="transparent">
          <ArrowLeft size="small" />
          <Typography variant="paragraph2">Incomes</Typography>
        </IconButton>

        <IconButton handleClick={() => navigate('expenses')} variant="transparent">
          <ArrowRight size="small" />
          <Typography variant="paragraph2">Expenses</Typography>
        </IconButton>
      </div>
    </div>
  );
};

export default CollapsibleButton;
