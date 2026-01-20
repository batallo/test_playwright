export type PizzaType = 'Margherita' | 'Pepperoni' | 'Hawaiian';

export type Order = {
    type: PizzaType;
    size: 'Small' | 'Medium' | 'Large';
    extraCheese: boolean;
}