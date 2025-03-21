import type { VariantProps } from '@gluestack-ui/nativewind-utils';

import React from 'react';
import { View, ViewProps } from 'react-native';

import { cardStyle } from './styles';

type ICardProps = VariantProps<typeof cardStyle> &
    ViewProps & { className?: string };

const Card = React.forwardRef<React.ComponentRef<typeof View>, ICardProps>(
    function Card(
        { className, size = 'md', variant = 'elevated', ...props },
        ref,
    ) {
        return (
            <View
                className={cardStyle({ size, variant, class: className })}
                {...props}
                ref={ref}
            />
        );
    },
);

Card.displayName = 'Card';

export { Card };
