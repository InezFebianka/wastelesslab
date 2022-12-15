// let spgB32N12 = {
//     widthGross: 1300,
//     lengthGross: 2530,
//     xA: 180,
//     yA: 30,
//     xB: 180,
//     yB: 300,
//     xC: 200,
//     yC: 100, 
//     xD: 200,
//     yD: 100, 
// }


function minABCD(slabSize){
    //LOOPING INSIDE OF LOOPING
    //     __________________
    //    /................. \
    //   |P:    STARTER    :Q|
    //   | :...............: |
    //    \_________________/
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

    let longerAC = Math.max(slabSize.xA, slabSize.xC)
    let longerBD = Math.max(slabSize.xB, slabSize.xD)
    
    let starter = slabSize.lengthGross - longerAC - longerBD

    let xyARatio = slabSize.xA/slabSize.yA
    let xyBRatio = slabSize.xB/slabSize.yB
    let xyCRatio = slabSize.xC/slabSize.yC
    let xyDRatio = slabSize.xD/slabSize.yD

    let outputNet = starter * slabSize.widthGross
    let netWidth = slabSize.widthGross
    let netLength = starter

    for(let i = 1; i <= longerAC; i++){
        let baseLength = starter + i
        let baseWidth
        if((longerAC == slabSize.xA && longerAC == slabSize.xC) || i > longerAC - (Math.min(slabSize.xA, slabSize.xC))){ 
            let minFromA = i/xyARatio
            let minFromC = i/xyCRatio
            if(i > longerAC - (Math.min(slabSize.xA, slabSize.xC)) && (longerAC != slabSize.xA || longerAC != slabSize.xC)){
                if(Math.min(slabSize.xA,slabSize.xC) == slabSize.xA){
                    minFromA = (i - (longerAC - slabSize.xA))/xyARatio
                } else {
                    minFromC = (i - (longerAC - slabSize.xC))/xyCRatio
                }
            }
            baseWidth = slabSize.widthGross - (minFromA + minFromC)
            for(let j = 0; j <= longerBD; j++){
                let lengthFull = baseLength + j
                let widthFull 
                let netFull
                if((longerBD == slabSize.xB && longerBD == slabSize.xD) || j > longerBD - (Math.min(slabSize.xB, slabSize.xD))){
                    let minFromB = j/xyBRatio
                    let minFromD = j/xyDRatio
                    if(j > longerBD - (Math.min(slabSize.xB, slabSize.xD)) && (longerBD != slabSize.xB || longerBD != slabSize.xD)){
                        if(Math.min(slabSize.xB, slabSize.xD) == slabSize.xB){
                            minFromB = (j - (longerBD - slabSize.xB))/xyBRatio
                        } else {
                            minFromD = (j - (longerBD - slabSize.xD))/xyDRatio
                        }
                    }
                    if(minFromA >= minFromB && minFromC >= minFromD){
                        widthFull = baseWidth
                    } else if(minFromA < minFromB && minFromC >= minFromD){
                        widthFull = baseWidth - (minFromB - minFromA)
                    } else if(minFromA >= minFromB && minFromC < minFromD){
                        widthFull = baseWidth - (minFromD - minFromC)
                    } else {
                        widthFull = baseWidth - (minFromB - minFromA) - (minFromD - minFromC)
                    }
                    
                } else if(longerBD == slabSize.xB){
                    let minFromB = j/xyBRatio
                    if(minFromA >= minFromB){
                        widthFull = baseWidth
                    } else {
                        widthFull = baseWidth - (minFromB - minFromA)
                    }
                } else {
                    let minFromD = j/xyDRatio
                    if(minFromC >= minFromD){
                        widthFull = baseWidth
                    } else {
                        widthFull = baseWidth - (minFromD-minFromC)
                    }
                }

                netFull = lengthFull * widthFull
                if(netFull > outputNet){
                    outputNet = netFull
                    netLength = lengthFull
                    netWidth = widthFull
                }
            }
        } else if (longerAC == slabSize.xA){
            let minFromA = i/xyARatio
            baseWidth = slabSize.widthGross - minFromA
            for(let j = 0; j <= longerBD; j++){
                let lengthFull = baseLength + j
                let widthFull
                let netFull
                if((longerBD == slabSize.xB && longerBD == slabSize.xD) || j > longerBD - (Math.min(slabSize.xB, slabSize.xD))){
                    let minFromB = j/xyBRatio
                    let minFromD = j/xyDRatio
                    if(j > longerBD - (Math.min(slabSize.xB, slabSize.xD)) && (longerBD != slabSize.xB || longerBD != slabSize.xD)){
                        if(Math.min(slabSize.xB, slabSize.xD) == slabSize.xB){
                            minFromB = (j - (longerBD - slabSize.xB))/xyBRatio
                        } else {
                            minFromD = (j - (longerBD - slabSize.xD))/xyDRatio
                        }
                    }
                    if(minFromA >= minFromB){
                        widthFull = baseWidth - minFromD
                    } else {
                        widthFull = baseWidth - minFromD - (minFromB-minFromA)
                    }
                } else if(longerBD == slabSize.xB){
                    let minFromB = j/xyBRatio
                    if(minFromA >= minFromB){
                        widthFull = baseWidth
                    } else {
                        widthFull = baseWidth - (minFromB - minFromA)
                    }
                } else {
                    let minFromD = j/xyDRatio
                    widthFull = baseWidth - minFromD
                }

                netFull = lengthFull * widthFull
                if(netFull > outputNet){
                    outputNet = netFull
                    netLength = lengthFull
                    netWidth = widthFull
                }
            }
            
        } else {
            let minFromC = i/xyCRatio
            baseWidth = slabSize.widthGross - minFromC
            for(let j = 0; j <= longerBD; j++){
                let lengthFull = baseLength + j
                let widthFull
                let netFull
                if((longerBD == slabSize.xB && longerBD == slabSize.xD) || j > longerBD - (Math.min(slabSize.xB, slabSize.xD))){
                    let minFromB = j/xyBRatio
                    let minFromD = j/xyDRatio
                    if(j > longerBD - (Math.min(slabSize.xB, slabSize.xD)) && (longerBD != slabSize.xB || longerBD != slabSize.xD)){
                        if(Math.min(slabSize.xB, slabSize.xD) == slabSize.xB){
                            minFromB = (j - (longerBD - slabSize.xB))/xyBRatio
                        } else {
                            minFromD = (j - (longerBD - slabSize.xD))/xyDRatio
                        }
                    }
                    if(minFromC >= minFromD){
                        widthFull = baseWidth - minFromB
                    } else {
                        widthFull = baseWidth - minFromB - (minFromD-minFromC)
                    }
                } else if(longerBD == slabSize.xD){
                    let minFromD = j/xyDRatio
                    if(minFromC >= minFromD){
                        widthFull = baseWidth
                    } else {
                        widthFull = baseWidth - (minFromD - minFromC)
                    }
                } else {
                    let minFromB = j/xyBRatio
                    widthFull = baseWidth - minFromB
                }

                netFull = lengthFull * widthFull
                if(netFull > outputNet){
                    outputNet = netFull
                    netLength = lengthFull
                    netWidth = widthFull
                }
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

// console.log(minABCD(spgB32N12));
module.exports = minABCD