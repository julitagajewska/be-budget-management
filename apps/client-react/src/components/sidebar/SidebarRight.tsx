import Container from '../../layout/Container.tsx';
import IconButton from '../buttons/IconButton.tsx';
import { Plus, SettingsAdjust } from '../icons/basil/index.ts';
import ProfilePicture from '../profile/ProfilePicture.tsx';
import AccountSidebarTile from '../tiles/sidebar/AccountSidebarTile.tsx';
import GoalSidebarTile from '../tiles/sidebar/GoalSidebarTile.tsx';
import Typography from '../typography/Typography.tsx';

type SidebarRightProps = {
  open: boolean;
};

const SidebarRight = ({ open }: SidebarRightProps) => {
  return (
    <Container variant="col-between" styles="gap-3">
      <Container variant="col-start" styles="gap-3">
        <Container variant="row-start" styles="gap-3">
          <ProfilePicture />
          <Container variant="col-center">
            <Typography variant="caption" bold>
              Jan Kowalski
            </Typography>
            <Typography variant="caption" styles="opacity-75">
              2 400 000.00 zł
            </Typography>
          </Container>
        </Container>

        <Container variant="col-start" styles="gap-3">
          <Container variant="row-between">
            <Typography variant="caption" bold>
              Your accounts
            </Typography>
            <IconButton color="accent-1" layout="icon-only" fill="filled" icon={<Plus size="small" />} />
          </Container>

          <Container variant="col-start" styles="gap-5">
            <AccountSidebarTile />
            <AccountSidebarTile />
            <AccountSidebarTile />
            <AccountSidebarTile />
            <AccountSidebarTile />
          </Container>
        </Container>

        <Container variant="col-start" styles="gap-3">
          <Container variant="row-between">
            <Typography variant="caption" bold>
              Goals
            </Typography>
            <IconButton color="accent-1" layout="icon-only" fill="filled" icon={<Plus size="small" />} />
          </Container>
        </Container>

        <Container variant="col-start" styles="gap-3">
          <GoalSidebarTile />
          <GoalSidebarTile />
        </Container>
      </Container>

      <Container variant="row-center">
        <IconButton>
          <SettingsAdjust size="small" />
          <Typography variant="helper">Configure sidebar</Typography>
        </IconButton>
      </Container>
    </Container>
  );
};

export default SidebarRight;
