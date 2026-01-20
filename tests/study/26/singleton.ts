import { NoCashRegister } from './no_singleton_implementation';
import { cashRegister } from './singleton_implementation';

// Проверяем:
const register1 = cashRegister;
const register2 = cashRegister;
const register3 = new NoCashRegister()

register1.addMoney(100);
console.log(register2.getBalance()); // Выведет 100! 

console.log(register1 === register2); // true (это один и тот же объект)