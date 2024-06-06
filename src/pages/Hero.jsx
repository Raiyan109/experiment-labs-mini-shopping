import leftArrow from '../assets/left arrow.png'
import topArrow from '../assets/top arrow.png'
import blackBg from '../assets/black rect.png'
import flowerTob from '../assets/flower tob.png'

const Hero = () => {
    return (
        <div className="mx-auto w-full px-12 lg:px-48">
            <div className="rounded-xl bg-primary w-full p-5 h-56 md:h-[500px] flex items-start px-10">
                <div className="flex-1 justify-start items-start space-y-5 md:space-y-10 px-5 py-10">
                    <div className=''>
                        <h1 className="font-anton text-3xl md:text-6xl text-center md:text-left tracking-wide leading-normal">Buy your</h1>
                        <h1 className="font-anton text-3xl md:text-6xl text-center md:text-left tracking-wide leading-normal">Dream Plants</h1>
                    </div>
                    <div className="">
                        <div className="relative">
                            <label className="sr-only"> Search </label>
                            <input
                                type="text"
                                id="Search"
                                placeholder="What are you looking for?"
                                className="w-full md:w-56 lg:w-1/3 rounded-md border-gray-200 py-2.5 px-4 shadow-sm sm:text-sm"
                            />

                        </div>
                    </div>
                </div>
                <div className="flex-1 hidden md:block">
                    <div className='relative '>
                        <img src={leftArrow} alt="" className='hidden lg:block absolute top-32 left-48 w-32 h-32 object-contain' />
                        <img src={topArrow} alt="" className='absolute w-28 h-28 object-contain top-0 right-0' />
                        <div className='absolute top-[107px] right-5'>
                            <img src={blackBg} alt="" className='w-[400px] h-[400px] object-contain ' />
                            <img src={flowerTob} alt="" className='w-76 h-76 object-contain absolute bottom-7 -right-4' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;