import { forwardRef } from 'react';

export default forwardRef(function FileInput({ className = '', ...props }, ref) {
    return (
        <input
            {...props}
            type="file"
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={ref}
        />
    );
});