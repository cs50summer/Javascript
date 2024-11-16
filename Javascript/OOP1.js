class Shape {
    name;
    sides;
    sideLength;
  
    constructor(name , sides , sideLength){
        this.name=name;
        this.sides = sides;
        this.sideLength=sideLength;
  }
  
  calcPerimeter(name,sides , sideLength){
       console.log(`This will calculate the perimeter of ${name}`)
       return (sides*sideLength)
  }
}


class Square extends Shape{
    
    
    constructor(name,side ,sideLength){
        super (name,side);
        
       
        this.sideLength=sideLength;
    }

    calcPerimeter(name,sides , sideLength){
        console.log(`This will calculate the perimeter of ${name}`)
        return (sides*sideLength)
   }
   
   calcArea(sideLength){
    console.log("Area is : ")
    return( sideLength*sideLength)
   }
}
  
triangle= new Shape ()
//square = new Shape()

console.log(triangle.calcPerimeter("Triangle",3,4))
//console.log(square.calcPerimeter("Square",4,4))
mysquare= new Square()

mysquare.calcPerimeter("square",4,4)

console.log(mysquare.calcArea(4))
  