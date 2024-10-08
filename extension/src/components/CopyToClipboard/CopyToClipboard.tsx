import { FC, useEffect, useState } from 'react';

import { CopyRounded } from '../icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip/Tooltip';
import styles from './CopyToClipboard.module.scss';

export type CopyToClipboardProps = {
  value: string;
  formatter?(value: string): string;
};

export const CopyToClipboard: FC<CopyToClipboardProps> = (props) => {
  const { value, formatter } = props;

  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  useEffect(() => {
    if (isTooltipOpened) {
      const timeout = setTimeout(() => {
        setIsTooltipOpened(false);
      }, 2_000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isTooltipOpened]);

  const handleClick = () => {
    if (!window.isSecureContext) return;
    navigator.clipboard.writeText(value).catch((e) => {
      console.error('Error during copying error message', e);
    });
  };

  return (
    <Tooltip
      clickOnly
      offset={1}
      placement="bottom"
      open={isTooltipOpened}
      onOpenChange={() => setIsTooltipOpened(true)}
    >
      <TooltipTrigger className={styles.root} role="button" onClick={handleClick}>
        <CopyRounded width={12} height={12} />
        <span>{formatter?.(value)}</span>
      </TooltipTrigger>
      <TooltipContent>Copied!</TooltipContent>
    </Tooltip>
  );
};
