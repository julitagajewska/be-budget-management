import Container from '../../../layout/Container.tsx';
import Wallet from '../../icons/basil/Wallet.tsx';
import Typography from '../../typography/Typography.tsx';

type AccountSidebarTileProps = {
  name?: string;
  value?: string;
  handleClick?: () => void;
  collapsed: boolean;
};

const AccountSidebarTile = ({ name, value, handleClick, collapsed }: AccountSidebarTileProps) => {
  return collapsed ? (
    <button
      type="button"
      onClick={handleClick}
      className="bg-neutral-light hover:bg-neutral hover:bg-opacity-100 transition-all duration-300 ease-in-out px-[8px] py-[6px] rounded-lg text-left"
    >
      <div className="bg-neutral-dark px-[6px] py-[6px] rounded-lg opacity-75">
        <Wallet size="small" />
      </div>
    </button>
  ) : (
    <button
      type="button"
      onClick={handleClick}
      className="bg-neutral-light hover:bg-neutral hover:bg-opacity-100 transition-all duration-300 ease-in-out px-[8px] py-[6px] rounded-lg text-left"
    >
      <Container variant="row-start">
        <Container variant="row-start" styles="gap-3">
          <div className="bg-neutral-dark px-[6px] py-[6px] rounded-lg opacity-75">
            <Wallet size="small" />
          </div>
          <Container variant="col-center">
            <Typography variant="caption" bold styles="opacity-75 text-ellipsis">
              {name}
            </Typography>
            <Typography variant="caption" styles="opacity-50">
              {value}
            </Typography>
          </Container>
        </Container>
      </Container>
    </button>
  );
};

AccountSidebarTile.defaultProps = {
  name: 'Example account',
  value: '2 400 000.00 zł',
  handleClick: () => {},
} as Pick<AccountSidebarTileProps, keyof AccountSidebarTileProps>;

export default AccountSidebarTile;
