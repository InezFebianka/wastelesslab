// let spgB32N12 = {
//     widthGross: 1300,
//     lengthGross: 2530,
//     xA: 180,
//     yA: 10,
//     xD: 200,
//     yD: 120, 
// }

function minAD(slabSize){
    //LOOPING INSIDE OF LOOPING
    //       ________________
    //     /:              : |
    //    |P:    STARTER   :Q|
    //    | :              : |
    //    |_:______________:/
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

    let starter = slabSize.lengthGross - (slabSize.xA + slabSize.xD)
    let xyARatio = slabSize.xA/slabSize.yA
    let xyDRatio = slabSize.xD/slabSize.yD
    // console.log(xyDRatio);
    // console.log(xyARatio);
    let outputNet = starter * slabSize.widthGross
    let netLength = starter
    let netWidth = slabSize.widthGross

    for(let i = 1; i <= slabSize.xA; i++){
        // console.log('A');
        let baseLength = starter + i
        let baseWidth = slabSize.widthGross - (slabSize.yA - ((slabSize.xA - i)/xyARatio))
        // console.log(baseWidth, (slabSize.yA - ((slabSize.xA - i)/xyARatio)), slabSize.yA, slabSize.xA, i, xyARatio);
        for(let j = 0; j <=slabSize.xD; j++){
            let lengthFull = baseLength + j
            let widthFull = baseWidth - (j/xyDRatio)
            let netFull = lengthFull * widthFull
            // console.log(lengthFull, ' X ', widthFull);

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

// console.log(minAD(spgB32N12));
module.exports = minAD