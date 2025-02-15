const Loader = () => {
    const circleCommonClasses = 'h-3 w-3 bg-blue-800 rounded-full absolute';

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='relative w-24 h-24'>
                <div className={`${circleCommonClasses} animate-spinner1`}></div>
                <div className={`${circleCommonClasses} animate-spinner2`}></div>
                <div className={`${circleCommonClasses} animate-spinner3`}></div>
            </div>
        </div>
    );
};

export default Loader;