const Loader = () => {
    const arcCommonClasses = 'absolute border-blue-800 rounded-full border-t-transparent';

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='relative w-32 h-32 flex items-center justify-center'>
                <div className={`${arcCommonClasses} border-2 w-20 h-20 animate-spinner1`}></div>
                <div className={`${arcCommonClasses} border-2 w-16 h-16 animate-spinner2`}></div>
                <div className={`${arcCommonClasses} border-1 w-6 h-6 animate-spinner3`}></div>
            </div>
        </div>
    );
};

export default Loader;