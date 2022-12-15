// let spgB32N12 = {
//     widthGross: 1250,
//     lengthGross: 2600,
//     xC: 140,
//     yC: 100,
//     xD: 70,
//     yD: 100, 
// }

//Starting point at D 
function minCD(slabSize){
    //STARTER FROM POINT CD
    //determined which point have longest y
    let selectedY = Math.max(slabSize.yC, slabSize.yD)

    //3 Possibility: yC longest, yD longest, or yC == yD
        //If yC longest, or yD longest ; area distribute to 3 section. starter, one-side slop, two-side slop. FIG.A for yA as longest
        //  ____________________  FIG.A
        // |                    |
        // |....................|
        // \....................|
        //  \                  /
        //   \________________/

        
        //If yC == yD; areea distribute to 2 section. starter, and two-side slop. 
        // FIG.B for yC == yD
        //  ____________________  FIG.B
        // |                    |
        // |                    |
        // |....................|
        //  \                  /
        //   \________________/

    let longestPoint

    if(selectedY == slabSize.yC && selectedY == slabSize.yD){
        longestPoint = null
    }else if(selectedY == slabSize.yC){
        longestPoint = 'C'
    } else if(selectedY == slabSize.yD){
        longestPoint = 'D'
    } 
    let starter = slabSize.widthGross - selectedY
    let xyCRatio = slabSize.xC/slabSize.yC
    let xyDRatio = slabSize.xD/slabSize.yD

    let outputNet = starter * slabSize.lengthGross //area starter
    let netWidth = starter
    let netLength = slabSize.lengthGross

    if(longestPoint == 'C' || longestPoint == 'D'){
        //one-side slop 
        //first determine which longest point; to determine which side is slopping
        let selectedRatio
        let unselectedRatio
        let barierPoint
        if(longestPoint == 'C'){
            selectedRatio = xyCRatio
            unselectedRatio = xyDRatio
            barierPoint = slabSize.yD

        } else {
            selectedRatio = xyDRatio
            unselectedRatio = xyCRatio
            barierPoint = slabSize.yC
        }

        //looping through section one-side slop
        
        for(let i=starter+1; i<=slabSize.widthGross - barierPoint; i++){
            
            let q = i - starter
            let p = selectedRatio * q

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

        //looping through section two-side slop
        for(let j=(slabSize.widthGross - barierPoint)+1; j <= slabSize.widthGross; j++){
            //longerpoint
            let q = j - starter
            let p = selectedRatio * q

            //shorterpoint
            let r = j - (slabSize.widthGross-barierPoint)
            let s = unselectedRatio * r

            //temporary net
            let lengthNet = slabSize.lengthGross - p - s
            let widthNet = j

            let netArea = lengthNet * widthNet
            if(netArea>outputNet){
                
                outputNet = netArea
                netWidth = widthNet
                netLength = lengthNet
            }

        }

    
    } else {
        for(let k = starter+1; k <= slabSize.widthGross; k++){
            let q = k - starter
            let p = xyCRatio * q 
            let r = xyDRatio * q

            //temporary net
            let lengthNet = slabSize.lengthGross - p - r
            let widthNet = k

            let netArea = lengthNet * widthNet
            if(netArea>outputNet){
                
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

// console.log(minCD(spgB32N12));
module.exports = minCD