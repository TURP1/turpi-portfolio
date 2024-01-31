import React, {ReactNode} from "react";
import clsx from "clsx";

type BoundedProps = {
    as?: React.ElementType,
    className?: string,
    children: ReactNode
}

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    ({as: Comp = 'section', className, children, ...restProps}, ref) => {

        return (
            <Comp ref={ref} className='px-4 py-10 md:px-6 md:py-14 lg:py-16' {...restProps}>
                <div className={clsx('mx-auto w-full max-w-7xl', className)}>
                    {children}
                </div>
            </Comp>
        )
    })

Bounded.displayName = 'Bounded'