const Ecommerce = () => {
  return (
    <>
      
      <div className="flex flex-row justify-center bg-slate-800 ">
        <div className=" p-5 ml-3 mb-5 text-md text-white  hover:text-orange-500">
          Home
        </div>
        <div className="p-5 ml-25 mb-5 text-md text-white  hover:text-orange-500">
          Product
        </div>
        <div className=" p-5 ml-5 mb-5 text-md text-white  hover:text-orange-500">
          Features
        </div>
        <div className=" p-5 ml-5 mb-5 text-md t   text-white  hover:text-orange-500">
          Market Place
        </div>
        <div className=" p-5 ml-5 mb-5 text-md text-white  hover:text-orange-500">
          Company
        </div>

        <input 
        type="text" 
        placeholder="Search"
        class="border border-gray-300 bg-white rounded-md p-2 w-100 focus:outline-none ml-2 mt-4 mb-4 focus:ring-2  focus:ring-blue-500"
        />

        <button className="bg-green-500 hover:bg-blue-500 ml-[15px] px-11 py-2 mt-5 mb-5 rounded-full hover:text-white">
          Login
        </button>
        <button className="bg-green-500 hover:bg-blue-500 ml-3 mt-5 mb-5 px-8 py-2 rounded-full hover:text-white">
          Sign up
        </button>
      </div>

      
        {/* <div className="flex flex-row bg-white ml-10 mt-10 mb-5 mr-300 shadow-xl rounded-lg justify-start">
        <div className="flex flex-col max-w-100 items-start bg-white h-80 w-[300px] mr-5 mb-10   rounded-lg">
          
          <img
            src="/images/9a.jpg"
            alt="Google Pixel 9A 5G"
            className="w-full  rounded-lg"
          />

          <p className=" px-2 font-serif text-xl  hover:text-orange-500">
            Google Pixel 9A 5G (8GB RAM, 256GB Storage)
          </p>
          <p className="px-2 text-xl   font-bold">₹43,999</p>
          
        </div>
      </div> */}

     
     
    </>
  );
};

export default Ecommerce;