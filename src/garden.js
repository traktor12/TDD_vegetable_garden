function getYieldForPlant (product) {
//No enviroment checks
    if(product.yield) return product.yield;
//----
    let totalYield = product.crop.yield
    let factors = product.crop.factor
    let environment = product.factors
   for(let factor in factors){
           for(let item in factors[factor]){    
               if(item === environment[factor]) {                                            
                   const cropsFactorValue = factors[factor][item];        
                switch (true){
                    case  cropsFactorValue > 0 || cropsFactorValue===50:
                        totalYield = totalYield+ (totalYield * cropsFactorValue / 100);
                        break;
                    case cropsFactorValue < 0 || cropsFactorValue===-50:
                        totalYield -= (-totalYield * cropsFactorValue / 100);
                        break;
                    case cropsFactorValue === 0 :
                        totalYield = totalYield;
                        break;    
                  }
               }
           }          
       }
   return totalYield;
}

function getYieldForCrop (product) {return getYieldForPlant(product) * product.numCrops;}

function getTotalYield (product) {
    total = 0
    product.crops.forEach((crops) => { total = total + getYieldForCrop(crops)})
    return total;
}

function getCostsForCrop (product) {return product.cost * (product.numCrops * product.crop.yield);}

//-Yield is used as KG (multiples as said on page) and numCrops as amount of individual pieces from 1kg to be sold
function getRevenueForCrop (product) {return getYieldForCrop(product) * product.salePrice }
  
function getProfitForCrop (product) {return getRevenueForCrop(product) - getCostsForCrop(product);}

function getTotalProfit (product) {
    total = 0
    product.calculate.forEach((calculate) => {total = total+getProfitForCrop(calculate);})
    return total;
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}