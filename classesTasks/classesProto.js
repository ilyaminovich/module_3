function Animal(name){
    this.name = name;
}

Animal.prototype.getName = function(){
    return this.name;
}

Cat.prototype = Object.create(Animal.prototype)

Cat.prototype.meow = function meow(){
    console.log(`${this.getName()} - meow`);
}

Dog.prototype = Object.create(Animal.prototype)

Dog.prototype.bark = function bark(){
    console.log(`${this.getName()} - bark`);
}

function Dog(name){
    this.name = name;
}

function Cat(name){
    this.name = name;
}

let bob = new Dog('BOB');
bob.bark();

let barsik = new Cat('Barsik');

barsik.meow();