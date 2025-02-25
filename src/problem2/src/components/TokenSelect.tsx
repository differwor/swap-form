import { FC, memo, useState } from "react";
import { Token } from "../types/token";
import Modal from "./common/modal";
import axiosInstance from "../libs/axios";

interface Props {
  onChange: (token: Token) => void;
}

const TokenSelect: FC<Props> = ({ onChange }) => {
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [listTokens, setListTokens] = useState<Token[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () =>
    axiosInstance
      .get("https://interview.switcheo.com/prices.json")
      .then((res) => setListTokens(res.data))
      .finally(() => setIsOpen(true));

  const selectToken = (token: Token) => {
    setSelectedToken(token);
    setIsOpen(false);
    onChange(token);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:text-gray-400"
      >
        {!selectedToken ? (
          <p className="text-gray-400">None</p>
        ) : (
          <>
            <img
              src={`/${selectedToken.currency}.svg`}
              alt={selectedToken.currency}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/USD.svg";
              }}
            />
            <p>{selectedToken.currency}</p>
          </>
        )}
        <img width="12" src="/arrow.svg" alt="ethereun" />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select Token"
        size="md"
      >
        <ul className="max-h-[500px] overflow-auto">
          {listTokens.map((token, index) => (
            // must have use index
            <li
              key={`${token.currency}-${index}`}
              onClick={() => selectToken(token)}
              className="w-full flex items-center gap-3 p-2 hover:bg-core5 rounded-xl cursor-pointer"
            >
              <img
                src={`/${token.currency}.svg`}
                alt={token.currency}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/USD.svg";
                }}
              />
              <p>{token.currency}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default memo(TokenSelect);
