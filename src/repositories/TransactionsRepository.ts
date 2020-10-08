import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((prev, current) => prev + current.value, 0);
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((prev, current) => prev + current.value, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const trasaction = new Transaction({ title, value, type });
    this.transactions.push(trasaction);
    return trasaction;
  }
}

export default TransactionsRepository;
