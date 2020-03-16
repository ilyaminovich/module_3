class Animal {
    constructor(name){
        this.name = name;
    }
}

class Dog extends Animal {
    
    bark(){
        console.log(`"${this.name}" - bark`)
    }
}

class Cat extends Animal{
    meow(){
        console.log(`"${this.name}" - meow`)
    }
}

let dog = new Dog('bobby');
dog.bark();

let cat = new Cat('kitty');
cat.meow();