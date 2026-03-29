import React from 'react';

function DataPlansGrid({ plans, onBuyPlan }) {
  if (!plans || !Array.isArray(plans)) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <div key={index} className="relative bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 flex flex-col transform hover:scale-[1.02] transition-transform duration-300 border border-gray-700 hover:border-blue-500">
          
          {/* Discount Badge */}
          {plan.originalPrice && Number(plan.originalPrice) > Number(plan.price) && (
            <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-extrabold px-4 py-1 rounded-full shadow-lg transform rotate-12 border-2 border-gray-900">
              SALE
            </div>
          )}

          <div className="mb-4">
            <span className="inline-block bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
              {plan.validity}
            </span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white mb-2">{plan.data}</h2>
          
          {/* Double Strikethrough Price */}
          <div className="mb-4 flex items-center">
            {plan.originalPrice && Number(plan.originalPrice) > Number(plan.price) && (
              <span className="text-gray-500 text-lg mr-3 font-semibold" style={{ textDecorationLine: 'line-through', textDecorationStyle: 'double' }}>
                ₦{plan.originalPrice}
              </span>
            )}
            <span className="text-4xl font-bold text-blue-400">₦{plan.price}</span>
          </div>

          {/* Admin Controlled Speed Display */}
          {plan.showSpeed && (plan.download > 0 || plan.upload > 0) && (
            <div className="flex items-center gap-3 mb-4 bg-gray-900/50 p-2 rounded-lg border border-gray-700 w-fit">
              {plan.download > 0 && <span className="text-sm font-bold text-green-400 flex items-center">⬇ {plan.download} Mbps</span>}
              {plan.upload > 0 && <span className="text-sm font-bold text-blue-400 flex items-center">⬆ {plan.upload} Mbps</span>}
            </div>
          )}

          <div className="flex-grow"></div>
          
          <button onClick={() => onBuyPlan(plan)} className="w-full mt-4 px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg">
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default DataPlansGrid;
