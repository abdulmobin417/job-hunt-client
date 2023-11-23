const Banner = () => {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="relative flex items-center justify-center w-full h-[600px] text-center bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/PqrSRxDN/pexels-fauxels-3184357.jpg')",
          }}
        >
          <div className="mx-4">
            <div className="z-10 max-w-3xl p-6 bg-gray-900 md:p-16 opacity-90 rounded-md">
              <div className="text-center">
                <h2 className="mb-6 text-4xl font-medium leading-10 tracking-tight text-gray-50 md:text-6xl">
                  Discover Your Dream Career Today
                </h2>
                <p className="mb-6 tracking-wide text-gray-300 sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5">
                  Explore thousands of job opportunities across industries. Find
                  the perfect fit for your skills and aspirations. Your next
                  career move starts here.
                </p>
                <div className="flex flex-wrap justify-center">
                  <input
                    className="w-full py-3 pl-4 mb-2 text-sm text-gray-900 rounded dark:placeholder-gray-300 dark:text-gray-300 dark:bg-gray-600 md:mb-0 md:w-1/2 shadow-lg"
                    type="text"
                    placeholder="Find Your Desire Job"
                  />
                  <button className="w-full px-6 py-3 text-sm font-semibold text-white bg-[#f03737] rounded md:w-auto md:ml-2 hover:bg-[#f03737] shadow-lg">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
