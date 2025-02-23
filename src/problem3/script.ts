/*
TS Type Issues:

- 'blockchain' parameter in 'getPriority' is typed as any -> losing TypeScript's benefits
- WalletBalance interface is missing the 'blockchain' property
- Inconsistent usage of interfaces (FormattedWalletBalance in map but WalletBalance in filter)


Logic Issues:

- The filter logic appears incorrect: lhsPriority is undefined (likely a typo for balancePriority)
- Filter logic seems inverted: returns true for balances ≤ 0, which is counterintuitive
- Sort comparison doesn't handle equal priorities, potentially leading to unstable sorts (missing return 0)


Performance Issues:

- useMemo dependency array includes 'prices' but prices isn't used in the computation
- Redundant mapping operations: sortedBalances is mapped twice (formattedBalances and rows)
- Using array index as React key is an anti-pattern


Code Structure Issues:

- getPriority should be moved outside component to prevent recreating on each render
Props interface extends BoxProps but only spreads rest props to a div
'children' prop is declared but do not use
*/


// REFACTOR CODE

// Enums and Interfaces
enum Blockchain {
  Osmosis = 'Osmosis',
  Ethereum = 'Ethereum',
  Arbitrum = 'Arbitrum',
  Zilliqa = 'Zilliqa',
  Neo = 'Neo'
}

enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20
}

interface WalletBalance {
  blockchain: Blockchain;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface Props extends BoxProps {}

// Utility functions
const getPriority = (blockchain: Blockchain): number => 
  BlockchainPriority[blockchain] ?? -99;

const formatBalance = (
  balance: WalletBalance, 
  price: number
): FormattedWalletBalance => ({
  ...balance,
  formatted: balance.amount.toFixed(),
  usdValue: price * balance.amount
});

// Component
const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority || 
               lhs.amount - rhs.amount; // Secondary sort by amount
      })
      .map(balance => formatBalance(balance, prices[balance.currency]));
  }, [balances, prices]);

  return (
    <div {...rest}>
      {formattedBalances.map((balance) => (
        <WalletRow 
          className={classes.row}
          key={`${balance.blockchain}-${balance.currency}`}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};