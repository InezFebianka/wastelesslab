// let spgB32N12 = {
//     widthGross:1250,
//     lengthGross: 2600,
//     xA: 100,
//     yA: 100
// }

//Starting point at D 
function minA(slabSize){
    let starter = slabSize.widthGross - slabSize.yA
    let xyRatio = slabSize.xA/slabSize.yA
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

// console.log(minA(spgB32N12));
module.exports = minA