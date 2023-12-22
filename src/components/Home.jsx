const Home = () => {
  return (
    <div>
      {/* xl:grid-cols-1 */}

      <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8 mt-44">
        <div
          className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
          aria-hidden="true"
        >
          <svg
            width="319"
            height="198"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <path id="welcome-a" d="M64 0l64 128-64-20-64 20z"></path>
              <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z"></path>
              <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z"></path>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="welcome-b"
              >
                <stop stopColor="#A5B4FC" offset="0%"></stop>
                <stop stopColor="#818CF8" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="50%"
                y1="24.537%"
                x2="50%"
                y2="100%"
                id="welcome-c"
              >
                <stop stopColor="#4338CA" offset="0%"></stop>
                <stop stopColor="#6366F1" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <g transform="rotate(64 36.592 105.604)">
                <mask id="welcome-d" fill="#fff">
                  <use xlinkHref="#welcome-a"></use>
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-a"></use>
                <path
                  fill="url(#welcome-c)"
                  mask="url(#welcome-d)"
                  d="M64-24h80v152H64z"
                ></path>
              </g>
              <g transform="rotate(-51 91.324 -105.372)">
                <mask id="welcome-f" fill="#fff">
                  <use xlinkHref="#welcome-e"></use>
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-e"></use>
                <path
                  fill="url(#welcome-c)"
                  mask="url(#welcome-f)"
                  d="M40.333-15.147h50v95h-50z"
                ></path>
              </g>
              <g transform="rotate(44 61.546 392.623)">
                <mask id="welcome-h" fill="#fff">
                  <use xlinkHref="#welcome-g"></use>
                </mask>
                <use fill="url(#welcome-b)" xlinkHref="#welcome-g"></use>
                <path
                  fill="url(#welcome-c)"
                  mask="url(#welcome-h)"
                  d="M40.333-15.147h50v95h-50z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
            Hi, Welcome to smart home of GROUP 15 IOT👋
          </h1>
          <p className="dark:text-indigo-200">
            The project was built within 3 months, this is our enthusiasm
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
