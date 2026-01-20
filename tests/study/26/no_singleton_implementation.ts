export class NoCashRegister {
    balance: number;

    constructor() {
        this.balance = 0;
    }

    addMoney(amount: number) {
        this.balance += amount;
    }

    getBalance() {
        return this.balance;
    }
}
