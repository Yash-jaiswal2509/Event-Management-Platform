import Loader from "@/components/Loader";

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
            <Loader />
        </div>
    );
};

export default LoadingScreen; 