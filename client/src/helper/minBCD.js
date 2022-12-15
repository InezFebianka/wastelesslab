// let spgB32N12 = {
//     widthGross: 1250,
//     lengthGross: 2600,
//     xB: 100,
//     yB: 100,
//     xC: 100,
//     yC: 100, 
//     xD: 400,
//     yD: 400, 
// }


//Starting point at A 
function minBCD(slabSize){
    //5 Possibility (4 MAINLY, ACTUALLY); 
        // xB == xD && yA == yB (MIGHT NOT NECESSARY)
        // (1) xB <= xD && yB <= yA
        // (2) xB <= xD && yB > yA
        // (3) xB > xD && yB <= yA
        // (4) xB > xD && yB > yA

    let longerX = Math.max(slabSize.xD, slabSize.xB)
    let longerY = Math.max(slabSize.yD, slabSize.yC)

    //STARTER CHOOSEN BY WHICH SLOP IS HIGHER
    let starterLength = slabSize.lengthGross - longerX
    let starterWidth = slabSize.widthGross - longerY

    let xyBRatio = slabSize.xB/slabSize.yB
    let xyCRatio = slabSize.xC/slabSize.yC
    let xyDRatio = slabSize.xD/slabSize.yD

    let outputNet = starterLength * starterWidth
    let netWidth = starterWidth
    let netLength = starterLength

    //CASE FOR 1 & 2
    if(longerX == slabSize.xB){
        for(let i = 1; i <= longerX; i++){
            let baseLength = starterLength + i
            let baseWidth = starterWidth - (i/xyBRatio)
            if(slabSize.xB - slabSize.xD >= i){
                //CASE FOR 2
                if(longerY == slabSize.yC){
                    for(let j = 0; j <= longerY; j++){

                        let lengthFull = baseLength - (xyCRatio * j)
                        let widthFull = baseWidth + j
                        let netFull = lengthFull * widthFull

                        if(netFull > outputNet){
                            outputNet = netFull
                            netWidth = widthFull
                            netLength = lengthFull
                        }

                    }
                    
                //CASE FOR 1
                } else {
                    for(let j = 0; j <= longerY; j++){
                        let lengthFull
                        if(j <= slabSize.yD-slabSize.yC){
                            lengthFull = baseLength 
                        }else {
                            lengthFull = baseLength - (xyCRatio * j)
                        }
                        
                        let widthFull = baseWidth + j
                        let netFull = lengthFull * widthFull
                        if(netFull > outputNet){
                            outputNet = netFull
                            netWidth = widthFull
                            netLength = lengthFull
                        }
                    }
                }
                
            } else {
                //CASE FOR 2
                if(longerY == slabSize.yA){
                    let widthMax = longerY - ((i - (slabSize.xB - slabSize.xD))/xyDRatio)
                    for(let j = 0; j <= widthMax; j++){
                        let lengthFull = baseLength - (xyCRatio * j)
                        let widthFull = baseWidth + j
                        let netFull = lengthFull * widthFull

                        if(netFull > outputNet){
                            outputNet = netFull
                            netWidth = widthFull
                            netLength = lengthFull
                        }
                    }
                //CASE FOR 1
                } else {
                    let widthMax = longerY - ((i - (slabSize.xB- slabSize.xD))/xyDRatio)
                    let lengthFull
                    for(let j = 0; j <= widthMax; j++) {
                        if(j <= slabSize.yD-slabSize.yC){
                            lengthFull = baseLength 
                        }else {
                            lengthFull = baseLength - (xyCRatio * j)
                        }

                        let widthFull = baseWidth + j
                        let netFull = lengthFull * widthFull

                        if(netFull > outputNet){
                            outputNet = netFull
                            netWidth = widthFull
                            netLength = lengthFull
                        }
                    }

                }
            }
            
            
        }
    //CASE FOR 3 & 4
    } else {
        for(let i = 1; i <= longerX; i++){
            let baseLength = starterLength + i
            let baseWidth
            if(i <= (longerX-slabSize.xB)){
                baseWidth = starterWidth
                let widthMax = longerY - (i/xyDRatio)
                for(let j = 0; j <= widthMax; j++){
                    let lengthFull
                    if(j <= longerY - slabSize.yC){
                        lengthFull = baseLength
                    } else {
                        lengthFull = baseLength - ((j-(longerY-slabSize.xB))* xyCRatio)
                    }
                    let widthFull = baseWidth + j
                    let netFull = widthFull * lengthFull

                    if(netFull > outputNet){
                        outputNet = netFull
                        netWidth = widthFull
                        netLength = lengthFull
                    }
                }
            } else {
                baseWidth = starterWidth - ((i-(longerX-slabSize.xB))/xyBRatio)
                let widthMax = longerY - (i/xyDRatio)
                for(let j = 0; j <= widthMax; j++){
                    let lengthFull
                    if(j <= longerY - slabSize.yC){
                        lengthFull = baseLength
                    } else {
                        lengthFull = baseLength - ((j-(longerY-slabSize.xB))* xyCRatio)
                    }
                    let widthFull = baseWidth + j
                    let netFull = widthFull * lengthFull

                    if(netFull > outputNet){
                        outputNet = netFull
                        netWidth = widthFull
                        netLength = lengthFull
                    }
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

// console.log(minBCD(spgB32N12));
module.exports = minBCD