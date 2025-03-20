import type { VariantProps } from '@gluestack-ui/nativewind-utils';

import React from 'react';

import { textStyle } from './styles';

type ITextProps = React.ComponentProps<'span'> & VariantProps<typeof textStyle>;

const Text = React.forwardRef<React.ComponentRef<'span'>, ITextProps>(
    function Text(
        {
            className,
            isTruncated,
            bold,
            underline,
            strikeThrough,
            size = 'md',
            sub,
            italic,
            highlight,
            ...props
        }: ITextProps & { className?: string },
        ref,
    ) {
        return (
            <span
                className={textStyle({
                    isTruncated,
                    bold,
                    underline,
                    strikeThrough,
                    size,
                    sub,
                    italic,
                    highlight,
                    class: className,
                })}
                {...props}
                ref={ref}
            />
        );
    },
);

Text.displayName = 'Text';

export { Text };
