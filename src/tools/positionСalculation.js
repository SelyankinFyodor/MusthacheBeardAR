/**
 * calculating position of beard and moustache
 * @param {object} measure - coef
 * @param args
 * @param {Array<{x:number, y:number}>} args.nose - nose coordinates
 * @param {Array<{x:number, y:number}>} args.lipsUp - up lips coordinates
 * @param {Array<{x:number, y:number}>} args.lipsDown - down lips coordinates
 * @param {Array<{x:number, y:number}>} args.oval - face border
 * @returns {{beard: *,
 * moustache: {width: number, x: number, angle: number, y: number, height: number}}}
 */
const position = (measure ,{nose, lipsUp, lipsDown, oval})=>{
    /**
     * moustache position calculating
     * @returns {{width: number, x: number, angle: number, y: number, height: number}}
     */
    const getMoustachePos = () => {
        let height_mul_coefficient = 4;
        let width_mul_coefficient = 1.55;

        const getWidth = () => Math.sqrt(
                Math.max(
                4*(lipsUp[3].x - lipsUp[0].x)*(lipsUp[3].x - lipsUp[0].x)+4*(lipsUp[3].y - lipsUp[0].y)*(lipsUp[3].y - lipsUp[0].y),
                    4*(lipsUp[6].x - lipsUp[3].x)*(lipsUp[6].x - lipsUp[3].x)+4*(lipsUp[6].y - lipsUp[3].y)*(lipsUp[6].y - lipsUp[3].y)
                    )
        );

        const getHeight = () => Math.sqrt(
            Math.max((lipsUp[3].y - nose[2].y)*(lipsUp[3].y - nose[2].y) + (lipsUp[3].x - nose[2].x)*(lipsUp[3].x - nose[2].x))
        );

        let width = width_mul_coefficient * measure * getWidth();
        let height =height_mul_coefficient * measure * getHeight()
        let angle = Math.atan((lipsUp[6].y - lipsUp[0].y)/(lipsUp[6].x - lipsUp[0].x) + (nose[4].y - nose[0].y)/(nose[4].x - nose[0].x)/2)

        let rel = Math.abs(oval[15].x - nose[4].x) / Math.abs(oval[1].x - nose[0].x)

        const getX = () => {
            // full face
            if (rel < 2  &&
                rel > 0.5){
                let x_height_add_coefficient = 0.3
                let x_width_add_coefficient = 1

                return measure * ((nose.reduce((sum, cur)=>{return sum + cur.x}, 0) + lipsUp.reduce((sum, cur)=>{return sum + cur.x}, 0))/12)
                    - width/2 * Math.cos(angle) * x_width_add_coefficient
                    + height/2 * Math.sin(angle) * x_height_add_coefficient
            }
            // face turned left
            else if (rel >= 2){
                let x_height_add_coefficient = 2
                let x_width_add_coefficient = -1

                return measure *
                    ((nose[3].x
                        + lipsUp[4].x + lipsUp[5].x + lipsUp[6].x)/4    )
                    - height/2 * Math.cos(angle) * x_height_add_coefficient
                    - width/2 * Math.sin(angle) * x_width_add_coefficient
            }
            // face turned right
            else if (rel <= 0.5){
                let x_height_add_coefficient = 2
                let x_width_add_coefficient = 0.1

                return measure *
                    ((nose[3].x
                        + lipsUp[4].x + lipsUp[5].x + lipsUp[6].x)/4    )
                    - height/2 * Math.cos(angle) * x_height_add_coefficient
                    - width/2 * Math.sin(angle) * x_width_add_coefficient
            }
        }

        const getY = () => {
            // full face
            if (rel < 2  &&
                rel > 0.5){
                let y_height_add_coefficient = 0.25
                let y_width_add_coefficient = 1

                return measure * ((nose.reduce((sum, cur)=>{return sum + cur.y}, 0) + lipsUp.reduce((sum, cur)=>{return sum + cur.y}, 0))/12)
                    - height/2 * Math.cos(angle) * y_height_add_coefficient
                    - width/2 * Math.sin(angle) * y_width_add_coefficient
            }
            // face turned left
            else if (rel >= 2){
                let y_height_add_coefficient = 0.1
                let y_width_add_coefficient = 0.2

                return measure * ((nose.reduce((sum, cur)=>{return sum + cur.y}, 0) + lipsUp.reduce((sum, cur)=>{return sum + cur.y}, 0))/12)
                    - height/2 * Math.cos(angle) * y_height_add_coefficient
                    - width/2 * Math.sin(angle) * y_width_add_coefficient
            }
            // face turned right
            else if (rel <= 0.5){
                let y_height_add_coefficient = -0.1
                let y_width_add_coefficient = 0.1

                return measure * ((nose.reduce((sum, cur)=>{return sum + cur.y}, 0) + lipsUp.reduce((sum, cur)=>{return sum + cur.y}, 0))/12)
                    - height/2 * Math.cos(angle) * y_height_add_coefficient
                    - width/2 * Math.sin(angle) * y_width_add_coefficient
            }
        }

        return {
            angle: angle*(180/Math.PI),
            width: width,
            height: height,
            y: getY(),
            x: getX()
        }
    }

    /**
     * beard position calculating
     * @returns {{width: number, x: number, angle: number, y: number, height: number}}
     */
    const getBeardPos = ()=>{
        let rel = Math.abs(oval[15].x - nose[4].x) / Math.abs(oval[1].x - nose[0].x)
        let angle = Math.atan((
            (lipsDown[0].y - lipsDown[6].y)/(lipsDown[0].x - lipsDown[6].x)
            + (oval[7].y - oval[9].y)/(oval[7].x - oval[9].x)
            + (oval[15].y - oval[1].y)/(oval[15].x - oval[1].x)
            + (oval[14].y - oval[2].y)/(oval[14].x - oval[2].x)
            + (oval[13].y - oval[3].y)/(oval[13].x - oval[3].x)
        )/5)

        let y_height_add_coefficient = 0.63
        let y_width_add_coefficient = 1.2
        let x_height_add_coefficient = 0.8
        let x_width_add_coefficient = 1.02

        const getHeight = () => {
            if (rel < 2 && rel > 0.5){
                let height_mul_coefficient = 8
                return height_mul_coefficient * measure*(oval[8].y- lipsDown[4].y)
            }
            else if (rel >= 2){
                let height_mul_coefficient = 8
                return height_mul_coefficient * measure*(oval[8].y- lipsDown[4].y)
            }
            else if (rel <= 0.5){
                let height_mul_coefficient = 8
                return height_mul_coefficient * measure*(oval[8].y- lipsDown[4].y)
            }
        }

        const getWidth = () => {
            if (rel < 2 && rel > 0.5){
                let width_mul_coefficient = 1.33
                return width_mul_coefficient * measure*(oval[15].x - oval[1].x)
            }
            else if (rel >= 2){
                let width_mul_coefficient = 1.1
                return width_mul_coefficient * measure*(oval[15].x - oval[1].x)
            }
            else if (rel <= 0.5){
                let width_mul_coefficient = 1.1
                return width_mul_coefficient * measure*(oval[15].x - oval[1].x)
            }
        }
        let width = getWidth()
        let height = getHeight()
        const getY = () => {
            if (rel < 2 && rel > 0.5){
                return measure*(oval[7].y + oval[8].y + oval[9].y + lipsDown[3].y + lipsDown[4].y + lipsDown[5].y)/6
                    - height/2 * Math.cos(angle) * y_height_add_coefficient
                    - width/2 * Math.sin(angle) * y_width_add_coefficient
            }
            else if (rel >= 2){
                return measure*(oval[7].y + oval[8].y + oval[9].y + lipsDown[3].y + lipsDown[4].y + lipsDown[5].y)/6
                    - height/2 * Math.cos(angle) * y_height_add_coefficient
                    - width/2 * Math.sin(angle) * y_width_add_coefficient
            }
            else if (rel <= 0.5){
                console.log('turn right')
                return lipsUp[0].y
                    - height/2 * Math.cos(angle) * y_height_add_coefficient
                    - width/2 * Math.sin(angle) * y_width_add_coefficient
            }
        }

        const getX = ()=> {
            return measure*oval[8].x
            - width/2 * Math.cos(angle) * x_width_add_coefficient
            + height/2 * Math.sin(angle) * x_height_add_coefficient
        }

        let y = getY()
        let x = getX()
        return {
            angle: angle*(180/Math.PI),
            width: width,
            height: height,
            y: y,
            x: x
        }
    }

    return ({
        moustache:getMoustachePos(),
        beard: getBeardPos()
    })
}


export default position
