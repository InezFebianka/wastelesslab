// let spgB32N12 = {
//     widthGross: 1250,
//     lengthGross: 2600,
//     xA: 100,
//     yA: 100,
//     xB: 100,
//     yB: 100, 
//     xC: 100,
//     yC: 100, 
// }


//Starting point at D 
function minABC(slabSize){
    //5 Possibility (4 MAINLY, ACTUALLY); 
        // xA == xC && yA == yB (MIGHT NOT NECESSARY)
        // (1) xA <= xC && yA <= yB
        // (2) xA <= xC && ya > yB
        // (3) xA > xC && ya <= yB
        // (4) xA > xC && ya > yB

    let longerX = Math.max(slabSize.xA, slabSize.xC)
    let longerY = Math.max(slabSize.yA, slabSize.yB)

    //STARTER CHOOSEN BY WHICH SLOP IS HIGHER
    let starterLength = slabSize.lengthGross - longerX
    let starterWidth = slabSize.widthGross - longerY

    let xyARatio = slabSize.xA/slabSize.yA
    let xyBRatio = slabSize.xB/slabSize.yB
    let xyCRatio = slabSize.xC/slabSize.yC

    let outputNet = starterLength * starterWidth
    let netWidth = starterWidth
    let netLength = starterLength

    //CASE FOR 1 & 2
    if(longerX == slabSize.xC){
        for(let i = 1; i <= longerX; i++){
            let baseLength = starterLength + i
            let baseWidth = starterWidth - (i/xyCRatio)
            if(slabSize.xC - slabSize.xA >= i){
                //CASE FOR 2
                if(longerY == slabSize.yB){
                    for(let j = 0; j <= longerY; j++){

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
                    for(let j = 0; j <= longerY; j++){
                        let lengthFull
                        if(j <= slabSize.yA-slabSize.yB){
                            lengthFull = baseLength 
                        }else {
                            lengthFull = baseLength - (xyBRatio * j)
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
                if(longerY == slabSize.yB){
                    let widthMax = longerY - ((i - (slabSize.xC - slabSize.xA))/xyARatio)
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
                    let widthMax = longerY - ((i - (slabSize.xC - slabSize.xA))/xyARatio)
                    let lengthFull
                    for(let j = 0; j <= widthMax; j++) {
                        if(j <= slabSize.yA-slabSize.yB){
                            lengthFull = baseLength 
                        }else {
                            lengthFull = baseLength - (xyBRatio * j)
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
            if(i <= (longerX-slabSize.xC)){
                baseWidth = starterWidth
                let widthMax = longerY - (i/xyARatio)
                for(let j = 0; j <= widthMax; j++){
                    let lengthFull
                    if(j <= longerY - slabSize.yB){
                        lengthFull = baseLength
                    } else {
                        lengthFull = baseLength - ((j-(longerY-slabSize.xC))* xyBRatio)
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
                baseWidth = starterWidth - ((i-(longerX-slabSize.xC))/xyCRatio)
                let widthMax = longerY - (i/xyARatio)
                for(let j = 0; j <= widthMax; j++){
                    let lengthFull
                    if(j <= longerY - slabSize.yB){
                        lengthFull = baseLength
                    } else {
                        lengthFull = baseLength - ((j-(longerY-slabSize.xC))* xyBRatio)
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

// console.log(minABC(spgB32N12));
module.exports = minABC