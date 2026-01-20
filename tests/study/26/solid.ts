import type { Order, PizzaType } from "./solid_types";

// SOLID

//
//
//
// Single Responsibility Principle (Принцип единственной ответственности)
// Один класс (или модуль) должен отвечать только за что-то одно.

// Не слишком ли много РАЗНОЙ работы делает этот класс? (Повар не должен чинить машину).

// Плохо: Повар и готовит, и считает деньги
class BadPizzaStaff {
    cookPizza(type: PizzaType) { /* ... */ }
    calculateBill(price: number) { /* ... */ }
}

// Хорошо: Разделяем логику
class PizzaChef {
    cook(type: PizzaType) { console.log(`Готовим пиццу: ${type}`); }
}

class Cashier {
    bill(amount: number) { console.log(`Счет на сумму: ${amount}₽`); }
}

//
//
//
// Open/Closed Principle (Принцип открытости/закрытости)
// Программные сущности должны быть открыты для расширения, но закрыты для модификации.

// Мы создаем базу для рецептов
abstract class PizzaRecipe {
    abstract getIngredients(): string[];
}

class Margherita extends PizzaRecipe {
    getIngredients() { return ['томаты', 'моцарелла']; }
}

class Pepperoni extends PizzaRecipe {
    getIngredients() { return ['томаты', 'пепперони']; }
}

class Pineapple extends PizzaRecipe {
    getIngredients() { return ['ананас', 'сыр']; }
}

// Печь умеет работать с любым рецептом, её код менять не нужно
class Oven {
    bake(recipe: PizzaRecipe) {
        const ingredients = recipe.getIngredients();
        console.log(`Запекаем ингредиенты: ${ingredients.join(', ')}`);
    }
}

//
//
//
// Liskov Substitution Principle (Принцип подстановки Барбары Лисков)
// Объекты в программе должны быть заменяемы на их подтипы без изменения правильности работы программы.

class Pizza {
    eat(): any { return "Вкусно!"; }
}

class HotPizza extends Pizza {
    // eat() { return "Горячо и вкусно!"; }
    eatHotPizza() { return "Сначала пойдуй, потом ешь. Горячо и вкусно!"; }
}

class FrozenPizza extends Pizza {
    // eat() { return "Грустно и невкусно" };
    eat() { return new Error('Cannot eat frozen pizza') }; // <= Error
    heat() { return "Ждём пока подогреется!"; }
}

// Если мы создадим "Муляж пиццы", который нельзя есть, 
// мы нарушим принцип Лисков, так как программа ожидает съедобный объект.
function consume(pizza: Pizza) {
    console.log(pizza.eat());
}

consume(new HotPizza()); // Работает!
consume(new FrozenPizza()); // Не Работает!

//
//
//
// Interface Segregation Principle (Принцип разделения интерфейса)
// Много специализированных интерфейсов лучше, чем один универсальный.

// Не заставляем ли мы ПОЛЬЗОВАТЕЛЯ интерфейса видеть методы, которые ему не нужны?

// ПЛОХО: Один большой интерфейс
abstract class BadDeliveryWindow {
    abstract takeOrder(order: Order): void;
    abstract cookPizza(type: PizzaType): void;
    abstract giveOrder(order: Order): void;
}

// ХОРОШО: Разделяем обязанности
abstract class Kitchen {
    abstract cookPizza(type: PizzaType): void;
}

abstract class DeliveryWindow {
    abstract takeOrder(order: Order): void;
    abstract giveOrder(order: Order): void;
}

//
//
//
// Dependency Inversion Principle (Принцип инверсии зависимостей)
// Зависеть нужно от абстракций, а не от конкретных деталей.

// Конкретные службы
class GlovoDelivery {
    send(order: Order) { console.log("Glovo везет заказ"); }
}

class YandexDelivery {
    send(order: Order) { console.log("Курьер на самокате везет заказ"); }
}

class WoltDelivery {
    send(order: Order) { console.log("Курьер Wolt везет заказ"); }
}

type Delivery = GlovoDelivery | YandexDelivery | WoltDelivery;
// Пиццерия не создает конкретную доставку внутри себя,
// а получает её как инструмент (инъекция зависимости)
class Pizzeria {
    delivery: Delivery;
    constructor(deliveryService: Delivery) {
        this.delivery = deliveryService; // Мы зависим от абстрактной доставки
    }

    // badCompleteOrder(order: Order) {
    //     console.log("Кое-как везу заказ...");
    // }

    completeOrder(order: Order) {
        this.delivery.send(order);
    }
}

// Теперь мы можем легко менять службу доставки:
const myShop = new Pizzeria(new YandexDelivery());
myShop.completeOrder({ type: "Margherita", size: "Medium", extraCheese: true });