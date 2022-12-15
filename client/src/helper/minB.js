// let spgB32N12 = {
//     widthGross:1300,
//     lengthGross: 2750,
//     xB: 300,
//     yB: 150
// }

//Starting point at C 
function minB(slabSize){
    let starter = slabSize.widthGross - slabSize.yB
    let xyRatio = slabSize.xB/slabSize.yB
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

// console.log(minB(spgB32N12));
module.exports = minB