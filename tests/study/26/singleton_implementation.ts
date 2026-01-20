class CashRegister {
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

export const cashRegister = new CashRegister();
