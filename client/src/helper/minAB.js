// let spgB32N12 = {
//     widthGross: 1250,
//     lengthGross: 2600,
//     xA: 140,
//     yA: 100,
//     xB: 70,
//     yB: 100, 
// }

//Starting point at D 
function minAB(slabSize){
    //STARTER FROM POINT CD
    //determined which point have longest y
    let selectedY = Math.max(slabSize.yA, slabSize.yB)

    //3 Possibility: yA longest, yB longest, or yA == yB
        //If yA longest, or yB longest ; area distribute to 3 section. starter, one-side slop, two-side slop. FIG.A for yA as longest
        //   __________________
        //  /..................\
        // /....................|
        // |                    |
        // |____________________|  FIG.A

        
        //If yA == yB; areea distribute to 2 section. starter, and two-side slop. 
        // FIG.B for yA == yB
        //   __________________
        //  /..................\
        // |                    |
        // |                    |
        // |____________________|  FIG.B

    let longestPoint

    if(selectedY == slabSize.yA && selectedY == slabSize.yB){
        longestPoint = null
    }else if(selectedY == slabSize.yA){
        longestPoint = 'A'
    } else if(selectedY == slabSize.yB){
        longestPoint = 'B'
    } 
    let starter = slabSize.widthGross - selectedY
    let xyARatio = slabSize.xA/slabSize.yA
    let xyBRatio = slabSize.xB/slabSize.yB

    let outputNet = starter * slabSize.lengthGross //area starter
    let netWidth = starter
    let netLength = slabSize.lengthGross

    if(longestPoint == 'A' || longestPoint == 'B'){
        //one-side slop 
        //first determine which longest point; to determine which side is slopping
        let selectedRatio
        let unselectedRatio
        let barierPoint
        if(longestPoint == 'A'){
            selectedRatio = xyARatio
            unselectedRatio = xyBRatio
            barierPoint = slabSize.yB

        } else {
            selectedRatio = xyBRatio
            unselectedRatio = xyARatio
            barierPoint = slabSize.yA
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
            let p = xyARatio * q 
            let r = xyBRatio * q

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

// console.log(minAB(spgB32N12));
module.exports = minAB