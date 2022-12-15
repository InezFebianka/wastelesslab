// let spgB32N12 = {
//     widthGross:1300,
//     lengthGross: 2750,
//     xC: 300,
//     yC: 150
// }

//Starting point at B 
function minC(slabSize){
    let starter = slabSize.widthGross - slabSize.yC
    let xyRatio = slabSize.xC/slabSize.yC
    let outputNet = starter * slabSize.lengthGross
    let netWidth = starter
    let netLength = slabSize.lengthGross
    for(let i=starter+1; i<=slabSize.widthGross; i++){
        let q = i - starter
        let p = xyRatio * q

        //temporary net
        let lengthNet = slabSize.lengthGross - p
        let widthNet = i

        let netArea = lengthNet * widthNet
        if(netArea>outputNet){
            outputNet = netArea
            netWidth = widthNet
            netLength = lengthNet
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

// console.log(minC(spgB32N12));
module.exports = minC
