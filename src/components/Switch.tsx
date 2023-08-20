import * as RadixSwitch from '@radix-ui/react-switch';

import { Box } from './Box';
import * as styles from './Switch.css';

type Props = Pick<RadixSwitch.SwitchProps, 'onCheckedChange' | 'checked'>;

export function Switch({ onCheckedChange, checked }: Props) {
  return (
    <form>
      <Box alignX="center">
        <RadixSwitch.Root
          onCheckedChange={onCheckedChange}
          checked={checked}
          className={styles.root}
          id="airplane-mode"
        >
          <RadixSwitch.Thumb className={styles.thumb} />
        </RadixSwitch.Root>
      </Box>
    </form>
  );
}
