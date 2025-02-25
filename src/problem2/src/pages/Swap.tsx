import { FC, useCallback, useMemo, useState } from "react";
import TokenSelect from "../components/TokenSelect";
import { Token } from "../types/token";

type TransactionForm = Record<
  "in" | "out",
  {
    amount: string;
    token: Token | null;
  }
>;

const Swap: FC = () => {
  const [transaction, setTransaction] = useState<TransactionForm>({
    in: {
      amount: "",
      token: null,
    },
    out: {
      amount: "",
      token: null,
    },
  });

  const balance = useMemo<{ [key: string]: number }>(() => ({ ETH: 12 }), []);

  const firstBalance = useMemo(
    () => balance[transaction.in.token?.currency || ""] || 0,
    [balance, transaction.in]
  );

  const secondBalance = useMemo(
    () => balance[transaction.out.token?.currency || ""] || 0,
    [balance, transaction.out]
  );

  const quoteRate = useMemo(() => {
    if (!transaction.in.token || !transaction.out.token) return 0;
    return (transaction.in.token.price / transaction.out.token.price).toFixed(
      4
    );
  }, [transaction.in.token, transaction.out.token]);

  const isCanSwap = useMemo(() => transaction.in.amount && transaction.out.amount, [transaction.in.amount, transaction.out.amount]);

  const handleChangeForm = useCallback(
    (
      key: "in:amount" | "in:token" | "out:amount" | "out:token",
      value: Token | string
    ) => {
      const [key1, key2] = key.split(":");
      setTransaction((prev) => ({
        ...prev,
        [key1]: { ...prev[key1 as "in" | "out"], [key2]: value },
      }));

      if (quoteRate) {
        if (key === "in:amount") {
          const genOutput =
            parseFloat((value as string) || "0") * parseFloat(quoteRate);
          setTransaction((prev) => ({
            ...prev,
            out: {
              ...prev.out,
              amount:
                genOutput % 1 !== 0
                  ? genOutput.toFixed(4)
                  : (genOutput || "").toString(),
            },
          }));
        }
        if (key === "out:amount") {
          const genInput =
            parseFloat((value as string) || "0") / parseFloat(quoteRate);
          setTransaction((prev) => ({
            ...prev,
            in: {
              ...prev.in,
              amount:
                genInput % 1 !== 0
                  ? genInput.toFixed(4)
                  : (genInput || "").toString(),
            },
          }));
        }
      }
    },
    [quoteRate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
          "Enter",
        ].includes(e.key)
      ) {
        return;
      }
      if (!/[\d.]/.test(e.key)) {
        e.preventDefault();
        return;
      }
    },
    []
  );

  return (
    <div className="w-full p-3 flex justify-center items-center">
      <div className=" w-full max-w-[400px]">
        <div className="bg-core4 rounded-2xl px-3 py-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-300">From</p>
            <div className="py-1 px-2 rounded-xl bg-core3 flex items-center gap-1">
              <img
                width="16"
                src="https://iconic.dynamic-static-assets.com/icons/sprite.svg#metamask"
                alt="metamask"
              />
              <p>0xD3…31e8</p>
              <img
                className="ml-2"
                width="12"
                src="/arrow.svg"
                alt="ethereun"
              />
            </div>
          </div>
          <div className="p-2 rounded-xl bg-core5 flex justify-between items-center gap-x-2 mb-4">
            <div className="flex items-center gap-x-2">
              <img width="24" src="/ETH.svg" alt="ethereun" />
              <p>Ethereum</p>
            </div>
            <img width="12" src="/arrow.svg" alt="ethereun" />
          </div>
          <div className="flex justify-between items-center mb-2">
            <input
              value={transaction.in.amount}
              onChange={(e) =>
                handleChangeForm("in:amount", e.target.value || "")
              }
              onKeyDown={(e) => {
                if (e.key === "." && transaction.in.amount.includes(".")) {
                  e.preventDefault();
                }
                handleKeyDown(e);
              }}
              className="outline-none text-3xl w-1/2"
              type="text"
              placeholder="0"
            />
            <TokenSelect
              onChange={(token) => handleChangeForm("in:token", token)}
            />
          </div>
          <div className="flex justify-between items-end text-sm">
            <p className="text-gray-400">${transaction.in.token?.price || 0}</p>
            <p className="text-gray-400 italic">Balance: {firstBalance}$</p>
          </div>
        </div>
        <div className="relative h-2">
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-core1 p-2 rounded cursor-pointer hover:scale-125 transition-all">
            <img width="16" src="/reverse.svg" alt="ethereun" />
          </button>
        </div>
        <div className="bg-core4 rounded-2xl px-3 py-5 mb-2">
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-300">To</p>
            <div className="py-1 px-2 rounded-xl bg-core3 flex items-center gap-1">
              <img
                width="16"
                src="https://iconic.dynamic-static-assets.com/icons/sprite.svg#metamask"
                alt="metamask"
              />
              <p>0xD3…31e8</p>
              <img
                className="ml-2"
                width="12"
                src="/arrow.svg"
                alt="ethereun"
              />
            </div>
          </div>
          <div className="p-2 rounded-xl bg-core5 flex justify-between items-center gap-x-2 mb-4">
            <div className="flex items-center gap-x-2">
              <img width="24" src="/ETH.svg" alt="ethereun" />
              <p>Ethereum</p>
            </div>
            <img width="12" src="/arrow.svg" alt="ethereun" />
          </div>
          <div className="flex justify-between items-center mb-2">
            <input
              value={transaction.out.amount}
              onChange={(e) =>
                handleChangeForm("out:amount", e.target.value || "")
              }
              onKeyDown={(e) => {
                if (e.key === "." && transaction.out.amount.includes(".")) {
                  e.preventDefault();
                }
                handleKeyDown(e);
              }}
              className="outline-none text-3xl w-1/2"
              type="text"
              placeholder="0"
            />
            <TokenSelect
              onChange={(token) => handleChangeForm("out:token", token)}
            />
          </div>
          <div className="flex justify-between items-end text-sm">
            <p className="text-gray-400">${transaction.out.token?.price || 0}</p>
            <p className="text-gray-400 italic">Balance: {secondBalance}$</p>
          </div>
        </div>
        {isCanSwap && (
          <div className="bg-core4 rounded-2xl p-3 mb-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-400">Quote rate:</p>
              <p>
                1 {transaction.in.token?.currency} = {quoteRate}{" "}
                {transaction.out.token?.currency}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-400">Estimate gas fee:</p>
              <p>0.0012 ETH</p>
            </div>
          </div>
        )}
        <button className={`${isCanSwap ? 'bg-core3' : 'bg-gray-800'} w-full text-center p-3 rounded-xl cursor-pointer`}>
          {isCanSwap ? "Swap" : <p className="text-gray-400">Enter an amount</p>}
        </button>
      </div>
    </div>
  );
};

export default Swap;
