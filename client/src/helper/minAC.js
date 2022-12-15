// let spgB32N12 = {
//     widthGross: 1300,
//     lengthGross: 2530,
//     xA: 180,
//     yA: 110,
//     xC: 200,
//     yC: 50, 
// }


function minAC(slabSize){
    //STARTER FROM POINT BD
    //3 possibility; xA > xC, xC > xA, xA == xC. 
    // FIG A: xA > xC. area distribute to 3 section. starter, one-side slop, two-side slop. FIG.A for yA as longest; 
    //      __________________________ FIG. A 
    //     /:                         |
    //    / :                         |
    //   /: :                         |
    //  | : :                         |
    //  | : :                         |
    //   \:_:_________________________|    

    //  FIG.B for yA == yB; area distribute to 2 section. starter, two-side slop.
    //    __________________________ FIG. B
    //   /:                         |
    //  | :                         |
    //  | :                         |
    //  | :                         |
    //  | :                         |
    //   \:_________________________|    

    let selectedX = Math.max(slabSize.xA, slabSize.xC)
    let longestPoint
    if(selectedX == slabSize.xA && selectedX == slabSize.xC){
        longestPoint = null
    }else if(selectedX == slabSize.xA){
        longestPoint = 'A'
    } else if(selectedX == slabSize.xC){
        longestPoint = 'C'
    } 

    let starter = slabSize.lengthGross - selectedX
    let xyARatio = slabSize.yA/slabSize.xA
    let xyCRatio = slabSize.yC/slabSize.xC

    let outputNet = starter * slabSize.widthGross //area starter
    let netWidth = slabSize.widthGross
    let netLength = starter

    if(longestPoint == 'A' || longestPoint == 'C'){
        // console.log('FFF');
        //first determine which longest point; to determine which side is slopping
        let selectedRatio
        let unselectedRatio
        let barierPoint
        if(longestPoint == 'A'){
            selectedRatio = xyARatio
            unselectedRatio = xyCRatio
            barierPoint = slabSize.xC
        } else {
            selectedRatio = xyCRatio
            unselectedRatio = xyARatio
            barierPoint = slabSize.xA
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
            let q = xyARatio * p
            let r = xyCRatio * p

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

// console.log(minAC(spgB32N12));
module.exports = minAC