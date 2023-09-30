import Container from '../../../layout/Container.tsx';
import Wallet from '../../icons/basil/Wallet.tsx';
import ProgressBar from '../../progress/ProgressBar.tsx';
import Typography from '../../typography/Typography.tsx';

type GoalSidebarTileProps = {
  name?: string;
  target: number;
  current: number;
  handleClick?: () => void;
};

const GoalSidebarTile = ({ name, target, current, handleClick }: GoalSidebarTileProps) => {
  const progress = (current / target) * 100;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-neutral-light hover:bg-neutral hover:bg-opacity-60 transition-all duration-300 ease-in-out px-[8px] py-[6px] rounded-lg text-left"
    >
      <Container variant="row-start">
        <Container variant="row-start" styles="gap-3">
          <div className="bg-neutral-dark px-[6px] py-[6px] rounded-lg opacity-75">
            <Wallet size="small" />
          </div>
          <Container variant="col-center">
            <Typography variant="caption" bold styles="opacity-75">
              {name}
            </Typography>
            <Typography variant="caption2" styles="opacity-50">
              {`Goal: ${target}`}
            </Typography>
          </Container>
        </Container>
      </Container>
      <Container variant="col-start" styles="pt-1 gap-1">
        <Container variant="row-between">
          <Typography variant="caption" bold styles="opacity-75">
            {current}
          </Typography>
          <Typography variant="caption" bold styles="opacity-75">
            50%
          </Typography>
        </Container>
        <ProgressBar value={progress} />
      </Container>
    </button>
  );
};

GoalSidebarTile.defaultProps = {
  name: 'Example Goal',
  target: 2000000,
  current: 1000000,
  handleClick: () => {},
} as Pick<GoalSidebarTileProps, keyof GoalSidebarTileProps>;

export default GoalSidebarTile;
