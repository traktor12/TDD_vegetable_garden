const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require("./garden");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
    test(`Get yield for plant with enviromental factors).`, ()=>{
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
            
        const environmentFactors = {
        sun: "low",
        };
        const calculate = { 
            crop: corn, 
            factors: environmentFactors }
        expect(getYieldForPlant(calculate)).toBe(15); 
    });
});
//-----------------------------------------------------------------------------------------------------------
//Double checked with different values
describe("getYieldForCrop", () => {
    test("Crop Yield no enviromental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const calculate = {
            crop: corn,
            numCrops: 5,
        };
        expect(getYieldForCrop(calculate)).toBe(15);
    });
});
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]
describe("getYieldForCrop", () => {
    test(`GetYieldForCrop with enviromental factors).`, ()=>{
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
        const environmentFactors = {
            sun: "high",
        };
        const calculate = {
            crop: corn,
            factors: environmentFactors,
            numCrops: 10,
        };
        expect(getYieldForCrop(calculate)).toBe(450);
    });
    });

//--------------------------------------------------------------------------------------------------------------
describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]
/*
    lots of sun: +50% yield
    medium sun: 100% yield
    little sun: -50% yield
 */
    test(`Get Total Yield, with enviromental factors`, ()=>{
        const corn = {
            name: "corn",
            yield: 1,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
        const cucumber = {
            name: "cucumber",
            yield: 1,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
            
        const environmentFactors = {
        sun: 'high',
        };

        const crops = [
            { 
                crop: corn, 
                factors: environmentFactors, 
                numCrops: 1 },
            {
                crop: cucumber, 
                factors: environmentFactors, 
                numCrops: 1 },
        ];
        //high sun: (1+0.5) +(1+0.5) = 3
        expect(getTotalYield({ crops })).toBe(3);

    });
});

//---------------------------------------------------------------------------------------------

describe("getCostsForCrop", () => {
    test("Crop Cost, no enviromental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const calculate = {
            crop: corn,
            cost: 2,
            numCrops: 5,
        };
        expect(getCostsForCrop(calculate)).toBe(30);
    });
});
//---------------------------------------------------------------------------------------------
describe("getRevenueForCrop", () => {
    test("Crop Revenue, no enviromental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const calculate = {
            crop: corn,
            cost: 2,
            salePrice: 5,
            numCrops: 5,
        };
        expect(getRevenueForCrop(calculate)).toBe(75);
    });
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]
    test("Crop revenue, enviromental factors included", ()=>{
        const corn = {
            name: "corn",
            yield: 4,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };            
        const environmentFactors = {
        sun: "high",
        };
        const calculate = {
            crop: corn,
            cost: 2,
            salePrice: 5,
            numCrops: 5,
            factors: environmentFactors,
        };
        /* yield = 4+2 (high sun) 
            yield 6 * numCrops 5 = 30
            30 * 5 salePrice =150
        */
        expect(getRevenueForCrop(calculate)).toBe(150);
    });
    });
//----------------------------------------------------------------------------------------------
describe("getProfitForCrop", () => {
    test("Crop Profit, no enviromental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
        
        };
        const calculate = {
            crop: corn,
            cost: 2,
            salePrice: 5,
            numCrops: 5,
        };
        expect(getProfitForCrop(calculate)).toBe(45);
    });
});
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]
describe("getProfitForCrop", () => {
    test("Crop Profit, enviromental factors included", () => {
        const corn = {
            name: "corn",
            yield: 4,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
        const environmentFactors = {
            sun: "high",
            };
        const calculate = {
            crop: corn,
            cost: 2,
            salePrice: 5,
            numCrops: 5,
            factors: environmentFactors,
        };
        expect(getProfitForCrop(calculate)).toBe(110);
    });
});
//------------------------------------------------------------------------------------------------
describe("getTotalProfit", () => {
    test("Total Profit, no enviromental factors", () => {
        const corn = {
            name: "corn",
            yield: 1,
        };
        const cucumber = {
            name: "cucumber",
            yield: 1,
        };
        const calculate = [
            { crop: corn, numCrops: 1, cost: 1, salePrice: 2 },
            { crop: cucumber, numCrops: 1, cost: 1, salePrice: 2 },
        ];
        expect(getTotalProfit({ calculate })).toBe(2);
    });
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]
test("Total Profit, enviromental factors included", () => {
    const corn = {
        name: "corn",
        yield: 10,
        factor: {
            sun: {
            low: -50,
            medium: 0,
            high: 50,
            },
        },
    };
    const cucumber = {
        name: "cucumber",
        yield: 10,
        factor: {
            sun: {
            low: 0,
            medium: 0,
            high: -50,
            },
        },
    };
    const environmentFactors = {
        sun: "high",
        };
    const calculate = [
        { crop: corn, numCrops: 2, cost: 1, salePrice: 2, factors: environmentFactors },
        { crop: cucumber, numCrops: 2, cost: 1, salePrice: 2, factors: environmentFactors },
    ];
    /*
    corn yield 10+5 = 15 * numCrops 2 = 30 * salePrice 2 = 60 - (numcrops 30 * cost1= 30) = 30 profit
    cucumber yield 10-5=5 * numCrops 2= 10 * salePrice 2 = 20 - (numcrops 10 * cost1= 10) = 10 profit
    30 corn profit + 10 cucumber profit = 40 total profit (high sun)
    */
    expect(getTotalProfit({ calculate })).toBe(40);
});
});
