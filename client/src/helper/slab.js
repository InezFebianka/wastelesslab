const minA = require ('./minA.js')
const minB = require ('./minB.js')
const minC = require ('./minC.js')
const minD = require ('./minD.js')
const minAB = require ('./minAB.js')
const minAC = require ('./minAC.js')
const minAD = require ('./minAD.js')
const minBC = require ('./minBC.js')
const minBD = require ('./minBD.js')
const minCD = require ('./minCD.js')
const minABC = require ('./minABC.js')
const minACD = require ('./minACD.js')
const minABD = require ('./minABD.js')
const minBCD = require ('./minBCD.js')
const minABCD = require ('./minABCD.js')

class Slab {
    constructor(slabCode, widthGross, lengthGross, xA, yA, xB, yB, xC, yC, xD, yD) {
        this.slabCode = slabCode
        this.widthGross = widthGross;
        this.lengthGross = lengthGross;
        this.xA = xA;
        this.yA = yA;
        this.xB = xB;
        this.yB = yB;
        this.xC = xC;
        this.yC = yC;
        this.xD = xD;
        this.yD = yD;
        this.type = this.findType()
        this.maxArea = this.getMaxArea()
    }

    findType(){
        if(this.xA == 0 && this.xB == 0 && this.xC == 0 && this.xD == 0){
            return 'perfect'
        } else if(this.xA != 0 && this.xB == 0 && this.xC == 0 && this.xD == 0){
            return 'minA'
        } else if(this.xA == 0 && this.xB != 0 && this.xC == 0 && this.xD == 0){
            return 'minB'
        } else if(this.xA == 0 && this.xB == 0 && this.xC != 0 && this.xD == 0){
            return 'minC'
        } else if(this.xA == 0 && this.xB == 0 && this.xC == 0 && this.xD != 0){
            return 'minD'
        } else if(this.xA != 0 && this.xB != 0 && this.xC == 0 && this.xD == 0){
            return 'minAB'
        } else if(this.xA != 0 && this.xB == 0 && this.xC != 0 && this.xD == 0){
            return 'minAC'
        } else if(this.xA != 0 && this.xB == 0 && this.xC == 0 && this.xD != 0){
            return 'minAD'
        } else if(this.xA == 0 && this.xB != 0 && this.xC != 0 && this.xD == 0){
            return 'minBC'
        } else if(this.xA == 0 && this.xB != 0 && this.xC == 0 && this.xD != 0){
            return 'minBD'
        } else if(this.xA == 0 && this.xB == 0 && this.xC != 0 && this.xD != 0){
            return 'minCD'
        } else if(this.xA != 0 && this.xB != 0 && this.xC != 0 && this.xD == 0){
            return 'minABC'
        } else if(this.xA != 0 && this.xB == 0 && this.xC != 0 && this.xD != 0){
            return 'minACD'
        } else if(this.xA != 0 && this.xB != 0 && this.xC == 0 && this.xD != 0){
            return 'minABD'
        } else if(this.xA == 0 && this.xB != 0 && this.xC != 0 && this.xD != 0){
            return 'minBCD'
        } else if(this.xA != 0 && this.xB != 0 && this.xC != 0 && this.xD != 0){
            return 'minABCD'
        }
    }

    getMaxArea(){
        if(this.type == 'perfect'){
            return {
                area: (this.widthGross * this.lengthGross)/1000000,
                width: this.widthGross,
                length: this.lengthGross,
                wasteInPercent: Math.round((((this.lengthGross * this.widthGross)- (this.widthGross * this.lengthGross))/(this.lengthGross * this.widthGross)) *100)
            }
        } else {
            let slab = {
                widthGross: this.widthGross,
                lengthGross: this.lengthGross,
                xA: this.xA,
                yA: this.yA,
                xB: this.xB,
                yB: this.yB,
                xC: this.xC,
                yC: this.yC,
                xD: this.xD,
                yD: this.yD,
            }
            let output
            switch (this.type) {
                case 'minA':
                    output = minA(slab)
                    break;
                case 'minB':
                    output = minB(slab)
                    break;
                case 'minC':
                    output = minC(slab)
                    break;
                case 'minD':
                    output = minD(slab)
                    break;
                case 'minAB':
                    output = minAB(slab)
                    break;
                case 'minAC':
                    output = minAC(slab)
                    break;
                case 'minAD':
                    output = minAD(slab)
                    break;
                case 'minBC':
                    output = minBC(slab)
                    break;
                case 'minBD':
                    output = minBD(slab)
                    break;
                case 'minCD':
                    output = minCD(slab)
                    break;
                case 'minABC':
                    output = minABC(slab)
                    break;
                case 'minABD':
                    output = minABD(slab)
                    break;
                case 'minACD':
                    output = minACD(slab)
                    break;
                case 'minBCD':
                    output = minBCD(slab)
                    break;
                case 'minABCD':
                    output = minABCD(slab)
                    break;
                default:
                    break;
            }
            return output
        }
    }
}

export default Slab