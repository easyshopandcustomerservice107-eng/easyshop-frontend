import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
    size = 'md',
    color = '#009e99', // Default to accent-gold
    fullPage = false
}) => {
    const sizes = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-2',
        lg: 'h-12 w-12 border-3',
        xl: 'h-20 w-20 border-4'
    };

    const loaderContent = (
        <div className="relative">
            <span
                className={`block rounded-full animate-spin ${sizes[size]}`}
                style={{ 
                    borderColor: `${color}20`, 
                    borderTopColor: color 
                }}
            />
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#0B1215] backdrop-blur-md">
                {loaderContent}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4">
            {loaderContent}
        </div>
    );
};

export default Loader;
