import { Box } from './Box';
import { Row } from './Stack';
import { Switch } from './Switch';
import { Text } from './Text';

import { MarginProps } from 'styles/mixins';
import { Theme } from 'styles/theme.css';

type Props = {
  toggle: () => void;
  theme?: Theme;
};
export function AppBar({ toggle, theme }: Props) {
  return (
    <Box background="primary.default" height={80} paddingX={8} width="100%">
      <Row height="100%" gap={32}>
        <HeaderItem>
          <Text level={3}>LEADERBOARDS</Text>
        </HeaderItem>
        <HeaderItem>
          <Text level={3}>SIMULATOR</Text>
        </HeaderItem>
        <HeaderItem marginLeft="auto">
          <Switch onCheckedChange={toggle} checked={theme === 'dark'} />
        </HeaderItem>
      </Row>
    </Box>
  );
}

function HeaderItem({
  children,
  marginLeft,
}: {
  children: React.ReactNode;
  marginLeft?: MarginProps['marginLeft'];
}) {
  return (
    <Box align="center" paddingX={24} marginLeft={marginLeft}>
      {children}
    </Box>
  );
}
