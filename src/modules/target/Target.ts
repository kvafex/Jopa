class Target{
    shootOnTarget(x = 0, y = 0, xCenter = 0, yCenter = 0): number{
        return ( x === xCenter && y === yCenter )                                 ? 10 : 0 ||
               ( Math.abs(y - yCenter) <= 2 / ( 1 + Math.abs(x - xCenter) ) - 1 ) ? 4  : 0 ||
               ( Math.abs(x - xCenter) + Math.abs(y - yCenter) <= 1 )             ? 3  : 0 ||
               ( Math.sqrt( ( x - xCenter ) ** 2 + ( y - yCenter ) ** 2 ) <= 1 )  ? 2  : 0 ||
               ( Math.abs(x - xCenter) <= 1 && Math.abs(y - yCenter) <= 1 )       ? 1  : 0;
    }
}

export default Target;