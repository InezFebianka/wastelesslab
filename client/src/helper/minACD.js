// let spgB32N12 = {
//     widthGross: 1250,
//     lengthGross: 2600,
//     xA: 100,
//     yA: 100,
//     xC: 100,
//     yC: 100, 
//     xD: 100,
//     yD: 100, 
// }


//Starting point at B 
function minACD(slabSize){
    //5 Possibility (4 MAINLY, ACTUALLY); 
        // xB == xD && yA == yB (MIGHT NOT NECESSARY)
        // (1) xB <= xD && yB <= yA
        // (2) xB <= xD && yB > yA
        // (3) xB > xD && yB <= yA
        // (4) xB > xD && yB > yA

    let longerX = Math.max(slabSize.xC, slabSize.xA)
    let longerY = Math.max(slabSize.yC, slabSize.yD)

    //STARTER CHOOSEN BY WHICH SLOP IS HIGHER
    let starterLength = slabSize.lengthGross - longerX
    let starterWidth = slabSize.widthGross - longerY

    let xyARatio = slabSize.xA/slabSize.yA
    let xyCRatio = slabSize.xC/slabSize.yC
    let xyDRatio = slabSize.xD/slabSize.yD

    let outputNet = starterLength * starterWidth
    let netWidth = starterWidth
    let netLength = starterLength

    //CASE FOR 1 & 2
    if(longerX == slabSize.xA){
        for(let i = 1; i <= longerX; i++){
            let baseLength = starterLength + i
            let baseWidth = starterWidth - (i/xyARatio)
            if(slabSize.xA - slabSize.xC >= i){
                //CASE FOR 2
                if(longerY == slabSize.yD){
                    for(let j = 0; j <= longerY; j++){

                        let lengthFull = baseLength - (xyDRatio * j)
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
                        if(j <= slabSize.yC-slabSize.yD){
                            lengthFull = baseLength 
                        }else {
                            lengthFull = baseLength - (xyDRatio * j)
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
                    let widthMax = longerY - ((i - (slabSize.xA - slabSize.xC))/xyCRatio)
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
                    let widthMax = longerY - ((i - (slabSize.xA - slabSize.xC))/xyCRatio)
                    let lengthFull
                    for(let j = 0; j <= widthMax; j++) {
                        if(j <= slabSize.yC-slabSize.yD){
                            lengthFull = baseLength 
                        }else {
                            lengthFull = baseLength - (xyDRatio * j)
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
                let widthMax = longerY - (i/xyCRatio)
                for(let j = 0; j <= widthMax; j++){
                    let lengthFull
                    if(j <= longerY - slabSize.yD){
                        lengthFull = baseLength
                    } else {
                        lengthFull = baseLength - ((j-(longerY-slabSize.xA))* xyDRatio)
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
                baseWidth = starterWidth - ((i-(longerX-slabSize.xA))/xyARatio)
                let widthMax = longerY - (i/xyCRatio)
                for(let j = 0; j <= widthMax; j++){
                    let lengthFull
                    if(j <= longerY - slabSize.yD){
                        lengthFull = baseLength
                    } else {
                        lengthFull = baseLength - ((j-(longerY-slabSize.xA))* xyDRatio)
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

// console.log(minACD(spgB32N12));
module.exports = minACD