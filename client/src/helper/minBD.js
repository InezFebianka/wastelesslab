// let spgB32N12 = {
//     widthGross: 1300,
//     lengthGross: 2530,
//     xB: 180,
//     yB: 110,
//     xD: 200,
//     yD: 50, 
// }


function minBD(slabSize){
    //STARTER FROM POINT AC
    //3 possibility; xB > xD, xD > xB, xB == xD. 
    // FIG A: xB > xD. area distribute to 3 section. starter, one-side slop, two-side slop; 
    //       _________________________ FIG. A 
    //      |                        :\
    //      |                        : \
    //      |                        : :\
    //      |                        : : |
    //      |                        : : |
    //      |                        : : |
    //      |                        : : /
    //      |________________________:_:/    

    //  FIG.B for xB == xD; area distribute to 2 section. starter, two-side slop.
    //    __________________________ FIG. B
    //   |                          :\
    //   |                          : \
    //   |                          : |
    //   |                          : |
    //   |                          : |
    //   |                          : /
    //   |__________________________:/    

    let selectedX = Math.max(slabSize.xB, slabSize.xD)
    let longestPoint
    if(selectedX == slabSize.xB && selectedX == slabSize.xD){
        longestPoint = null
    }else if(selectedX == slabSize.xB){
        longestPoint = 'B'
    } else if(selectedX == slabSize.xD){
        longestPoint = 'D'
    } 

    let starter = slabSize.lengthGross - selectedX
    let xyBRatio = slabSize.yB/slabSize.xB
    let xyDRatio = slabSize.yD/slabSize.xD

    let outputNet = starter * slabSize.widthGross //area starter
    let netWidth = slabSize.widthGross
    let netLength = starter

    if(longestPoint == 'B' || longestPoint == 'D'){
        //first determine which longest point; to determine which side is slopping
        let selectedRatio
        let unselectedRatio
        let barierPoint
        if(longestPoint == 'B'){
            selectedRatio = xyBRatio
            unselectedRatio = xyDRatio
            barierPoint = slabSize.xD
        } else {
            selectedRatio = xyDRatio
            unselectedRatio = xyBRatio
            barierPoint = slabSize.xB
        }

        //looping through section one-side slop
        for(let i=starter+1; i<=slabSize.lengthGross - barierPoint; i++){
            let p = i - starter
            let q = selectedRatio * p

            //temporary net
            let lengthNet = i
            let widthNet = slabSize.widthGross - q
            let netArea = lengthNet * widthNet
            // console.log(netArea, " = ", lengthNet, ' x ', widthNet);
            if(netArea > outputNet){
                outputNet = netArea
                netWidth = widthNet
                netLength = lengthNet
            }
        }

        //looping through section two-side slop
        for(let j=(slabSize.lengthGross - barierPoint) + 1; j <= slabSize.lengthGross; j++){
            //longerpoint
            let p = j - starter
            let q = selectedRatio * p

            //shorterpoint
            let s = j - (slabSize.lengthGross - barierPoint)
            let r = unselectedRatio * s

            //temporary net 
            let widthNet = slabSize.widthGross - q - r
            let lengthNet = j

            let netArea = lengthNet * widthNet
            if(netArea > outputNet){
                outputNet = netArea
                netWidth = widthNet
                netLength = lengthNet
            }
        }
    } else {
        // console.log('TES');
        for(let k = starter + 1; k <= slabSize.lengthGross; k++){
            let p = k - starter
            let q = xyBRatio * p
            let r = xyDRatio * p

            //temporary net
            let widthNet = slabSize.widthGross - q - r
            let lengthNet = k

            let netArea = lengthNet * widthNet
            // console.log(netArea, " = ", lengthNet, ' x ', widthNet);
            if(netArea > outputNet){
                outputNet = netArea
                netWidth = widthNet
                netLength = lengthNet
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

// console.log(minBD(spgB32N12));
module.exports = minBD