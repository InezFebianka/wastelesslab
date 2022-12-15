// let spgB32N12 = {
//     widthGross: 1300,
//     lengthGross: 2530,
//     xB: 180,
//     yB: 30,
//     xC: 200,
//     yC: 100, 
// }

function minBC(slabSize){
    //LOOPING INSIDE OF LOOPING
    //     __________________
    //    | :              : \
    //    |P:    STARTER   :Q|
    //    | :              : |
    //     \:______________:_|
    //    
    //  STARTER
    //  LOOP THROUGH P(+1)
    //      LOOP THROUGH Q(+1)
    //      LOOP THROUGH Q(+2)
    //      LOOP THROUGH Q(+2)
    //      ....
    //      UNTIL LINE BD(MENTOK)
    //  LOOP THROUGH P(+2)
    //  REPEAT

    // let starter = slabSize.widthGross - slabSize.yC
    // let xyRatio = slabSize.xC/slabSize.yC
    // let outputNet = starter * slabSize.lengthGross
    // let netWidth = starter
    // let netLength = slabSize.lengthGross

    let starter = slabSize.lengthGross - (slabSize.xB + slabSize.xC)
    let xyBRatio = slabSize.xB/slabSize.yB
    let xyCRatio = slabSize.xC/slabSize.yC

    let outputNet = starter * slabSize.widthGross
    let netLength = starter
    let netWidth = slabSize.widthGross

    for(let i = 1; i <= slabSize.xB; i++){
        let baseLength = starter + i
        let baseWidth = slabSize.widthGross - (slabSize.yB - ((slabSize.xB - i)/xyBRatio))

        for(let j = 0; j <=slabSize.xC; j++){
            let lengthFull = baseLength + j
            let widthFull = baseWidth - (j/xyCRatio)
            let netFull = lengthFull * widthFull

            if(netFull > outputNet){
                outputNet = netFull
                netLength = lengthFull
                netWidth = widthFull
            }
        }
    }
    let output = {
        area: outputNet/1000000,
        width: netWidth,
        length: netLength,
        wasteInPercent: Math.round((((slabSize.lengthGross * slabSize.widthGross)- outputNet)/(slabSize.lengthGross * slabSize.widthGross)) *100)
    }
    return output
}

// console.log(minBC(spgB32N12));
module.exports = minBC