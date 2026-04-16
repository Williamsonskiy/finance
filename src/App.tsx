import { useEffect, useMemo, useState } from "react";

type OperationType = "income" | "expense";

interface Operation {
  id: string;
  type: OperationType;
  name: string;
  amount: number;
}

const STORAGE_KEY = "finance_ops";

export default function App() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [type, setType] = useState<OperationType>("income");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");


  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const op of operations) {
      if (op.type === "income") income += op.amount;
      else expense += op.amount;
    }

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [operations]);


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Учёт финансов</h1>

      <div className="mb-4 space-y-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as OperationType)}
          className="border p-2 w-full"
        >
          <option value="income">Доход</option>
          <option value="expense">Трата</option>
        </select>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название"
          className="border p-2 w-full"
        />

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Сумма"
          type="number"
          className="border p-2 w-full"
        />

        <button
          onClick={addOperation}
          className="bg-black text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      <div className="mb-4">
        <div>Income: {totals.income}</div>
        <div>Expense: {totals.expense}</div>
        <div>Balance: {totals.balance}</div>
      </div>

      <div className="space-y-2">
        {operations.map((op) => (
          <div
            key={op.id}
            className="border p-2 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{op.name}</div>
              <div className="text-sm text-gray-500">{op.type == 'income' ? 'Доход' : 'Трата'}</div>
            </div>

            <div className="flex items-center gap-3">
              <div>{op.amount}</div>
              <button
                onClick={() => removeOperation(op.id)}
                className="text-red-500"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}