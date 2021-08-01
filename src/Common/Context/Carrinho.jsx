import { createContext, useContext, useEffect, useState } from "react";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0);
  return (
    <CarrinhoContext.Provider
      value={{ carrinho, setCarrinho, totalProdutos, setTotalProdutos }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho, totalProdutos, setTotalProdutos } =
    useContext(CarrinhoContext);

  const mudarQuantidade = (id, quantidade) => {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) {
        itemDoCarrinho.quantidade += quantidade;
      }
      return itemDoCarrinho;
    });
  };

  const adicionarProduto = (novoProduto) => {
    const verificaSeProdutoExiste = carrinho.some(
      (itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
    );
    if (!verificaSeProdutoExiste) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    setCarrinho(mudarQuantidade(novoProduto.id, 1));
  };

  const removerProduto = (id) => {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);

    const verificaUltimoElemento = produto.quantidade === 1;

    if (verificaUltimoElemento) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }

    setCarrinho(mudarQuantidade(id, -1));
  };

  useEffect(() => {
    const totalProd = carrinho.reduce(
      (acumulador, produto) => acumulador + produto.quantidade,
      0
    );

    setTotalProdutos(totalProd);
  }, [carrinho, setTotalProdutos]);

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    totalProdutos,
  };
};

export default CarrinhoProvider;
