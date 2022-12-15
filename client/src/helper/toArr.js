function toArr(str){
    let output = []
    let temp = ''
    for(let i = 0; i < str.length; i++){
        if(str[i] !== ' '){
            temp = temp + str[i]
            if(i === str.length - 1){
                if( !isNaN(+temp)){
                    temp = +temp
                }
                output.push(temp)
            }
        } else {
            if( !isNaN(+temp)){
                temp = +temp
            }
            output.push(temp)
            temp = ''
        }
    }
    return output
}

// console.log(toArr("1234 3243 1213 4335a"));
export default toArr
