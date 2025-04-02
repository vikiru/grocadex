import type { VariantProps } from '@gluestack-ui/nativewind-utils';

import { H1, H2, H3, H4, H5, H6 } from '@expo/html-elements';
import { cssInterop } from 'nativewind';
import React, { forwardRef, memo } from 'react';

import { headingStyle } from './styles';

type IHeadingProps = React.ComponentPropsWithoutRef<typeof H1> &
    VariantProps<typeof headingStyle> & {
        as?: React.ElementType;
    };

cssInterop(H1, { className: 'style' });
cssInterop(H2, { className: 'style' });
cssInterop(H3, { className: 'style' });
cssInterop(H4, { className: 'style' });
cssInterop(H5, { className: 'style' });
cssInterop(H6, { className: 'style' });

const MappedHeading = memo(
    forwardRef<React.ComponentRef<typeof H1>, IHeadingProps>(
        function MappedHeading(
            {
                size,
                className,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                ...props
            },
            ref,
        ) {
            switch (size) {
                case '2xl':
                    return (
                        <H2
                            className={headingStyle({
                                size,
                                isTruncated,
                                bold,
                                underline,
                                strikeThrough,
                                sub,
                                italic,
                                highlight,
                                class: className,
                            })}
                            {...props}
                            // @ts-expect-error : type issue
                            ref={ref}
                        />
                    );
                case '3xl':
                case '4xl':
                case '5xl':
                    return (
                        <H1
                            className={headingStyle({
                                size,
                                isTruncated,
                                bold,
                                underline,
                                strikeThrough,
                                sub,
                                italic,
                                highlight,
                                class: className,
                            })}
                            {...props}
                            // @ts-expect-error : type issue
                            ref={ref}
                        />
                    );
                case 'lg':
                    return (
                        <H4
                            className={headingStyle({
                                size,
                                isTruncated,
                                bold,
                                underline,
                                strikeThrough,
                                sub,
                                italic,
                                highlight,
                                class: className,
                            })}
                            {...props}
                            // @ts-expect-error : type issue
                            ref={ref}
                        />
                    );
                case 'md':
                    return (
                        <H5
                            className={headingStyle({
                                size,
                                isTruncated,
                                bold,
                                underline,
                                strikeThrough,
                                sub,
                                italic,
                                highlight,
                                class: className,
                            })}
                            {...props}
                            // @ts-expect-error : type issue
                            ref={ref}
                        />
                    );
                case 'sm':
                case 'xs':
                    return (
                        <H6
                            className={headingStyle({
                                size,
                                isTruncated,
                                bold,
                                underline,
                                strikeThrough,
                                sub,
                                italic,
                                highlight,
                                class: className,
                            })}
                            {...props}
                            // @ts-expect-error : type issue
                            ref={ref}
                        />
                    );
                case 'xl':
                    return (
                        <H3
                            className={headingStyle({
                                size,
                                isTruncated,
                                bold,
                                underline,
                                strikeThrough,
                                sub,
                                italic,
                                highlight,
                                class: className,
                            })}
                            {...props}
                            // @ts-expect-error : type issue
                            ref={ref}
                        />
                    );
                default:
                    return (
                        <H4
                            className={headingStyle({
                                size,
                                isTruncated,
                                bold,
                                underline,
                                strikeThrough,
                                sub,
                                italic,
                                highlight,
                                class: className,
                            })}
                            {...props}
                            // @ts-expect-error : type issue
                            ref={ref}
                        />
                    );
            }
        },
    ),
);

const Heading = memo(
    forwardRef<React.ComponentRef<typeof H1>, IHeadingProps>(function Heading(
        { className, size = 'lg', as: AsComp, ...props },
        ref,
    ) {
        const {
            isTruncated,
            bold,
            underline,
            strikeThrough,
            sub,
            italic,
            highlight,
        } = props;

        if (AsComp) {
            return (
                <AsComp
                    className={headingStyle({
                        size,
                        isTruncated,
                        bold,
                        underline,
                        strikeThrough,
                        sub,
                        italic,
                        highlight,
                        class: className,
                    })}
                    {...props}
                />
            );
        }

        return (
            <MappedHeading
                className={className}
                ref={ref}
                size={size}
                {...props}
            />
        );
    }),
);

Heading.displayName = 'Heading';

export { Heading };
