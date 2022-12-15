// let spgB32N12 = {
//     widthGross: 1250,
//     lengthGross: 2600,
//     xA: 100,
//     yA: 100,
//     xB: 100,
//     yB: 100, 
//     xD: 100,
//     yD: 100, 
// }


//Starting point at C 
function minABD(slabSize){
    //5 Possibility (4 MAINLY, ACTUALLY); 
        // xB == xD && yA == yB (MIGHT NOT NECESSARY)
        // (1) xB <= xD && yB <= yA
        // (2) xB <= xD && yB > yA
        // (3) xB > xD && yB <= yA
        // (4) xB > xD && yB > yA

    let longerX = Math.max(slabSize.xB, slabSize.xD)
    let longerY = Math.max(slabSize.yB, slabSize.yA)

    //STARTER CHOOSEN BY WHICH SLOP IS HIGHER
    let starterLength = slabSize.lengthGross - longerX
    let starterWidth = slabSize.widthGross - longerY

    let xyARatio = slabSize.xA/slabSize.yA
    let xyBRatio = slabSize.xB/slabSize.yB
    let xyDRatio = slabSize.xD/slabSize.yD

    let outputNet = starterLength * starterWidth
    let netWidth = starterWidth
    let netLength = starterLength

    //CASE FOR 1 & 2
    if(longerX == slabSize.xD){
        for(let i = 1; i <= longerX; i++){
            let baseLength = starterLength + i
            let baseWidth = starterWidth - (i/xyDRatio)
            if(slabSize.xD - slabSize.xB >= i){
                //CASE FOR 2
                if(longerY == slabSize.yA){
                    for(let j = 0; j <= longerY; j++){

                        let lengthFull = baseLength - (xyARatio * j)
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
                        if(j <= slabSize.yB-slabSize.yA){
                            lengthFull = baseLength 
                        }else {
                            lengthFull = baseLength - (xyARatio * j)
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
                    let widthMax = longerY - ((i - (slabSize.xD - slabSize.xB))/xyBRatio)
                    for(let j = 0; j <= widthMax; j++){
                        let lengthFull = baseLength - (xyBRatio * j)
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
                    let widthMax = longerY - ((i - (slabSize.xD - slabSize.xB))/xyBRatio)
                    let lengthFull
                    for(let j = 0; j <= widthMax; j++) {
                        if(j <= slabSize.yB-slabSize.yA){
                            lengthFull = baseLength 
                        }else {
                            lengthFull = baseLength - (xyARatio * j)
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
            if(i <= (longerX-slabSize.xD)){
                baseWidth = starterWidth
                let widthMax = longerY - (i/xyBRatio)
                for(let j = 0; j <= widthMax; j++){
                    let lengthFull
                    if(j <= longerY - slabSize.yA){
                        lengthFull = baseLength
                    } else {
                        lengthFull = baseLength - ((j-(longerY-slabSize.xD))* xyARatio)
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
                baseWidth = starterWidth - ((i-(longerX-slabSize.xD))/xyDRatio)
                let widthMax = longerY - (i/xyBRatio)
                for(let j = 0; j <= widthMax; j++){
                    let lengthFull
                    if(j <= longerY - slabSize.yA){
                        lengthFull = baseLength
                    } else {
                        lengthFull = baseLength - ((j-(longerY-slabSize.xD))* xyARatio)
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

// console.log(minABD(spgB32N12));
module.exports = minABD