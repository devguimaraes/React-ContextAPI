import { createContext, useContext, useEffect, useState } from "react";
import usePagamentoContext from "./Pagamento";
import { useUsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [valorTotal, setvalorTotal] = useState(0);
  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        totalProdutos,
        setTotalProdutos,
        valorTotal,
        setvalorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    totalProdutos,
    setTotalProdutos,
    valorTotal,
    setvalorTotal,
  } = useContext(CarrinhoContext);

  const { formaDePagamento } = usePagamentoContext();

  const { saldo, setSaldo } = useUsuarioContext();

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

  const efetuarCompra = () => {
    setCarrinho([]);
    setSaldo((saldoAtual) => saldoAtual - valorTotal);
  };

  useEffect(() => {
    const { totalProd, valorTotal } = carrinho.reduce(
      (acumulador, produto) => ({
        totalProd: acumulador.totalProd + produto.quantidade,
        valorTotal: acumulador.valorTotal + produto.valor * produto.quantidade,
      }),
      { totalProd: 0, valorTotal: 0 }
    );

    setTotalProdutos(totalProd);
    setvalorTotal(Number(valorTotal) * Number(formaDePagamento.juros));
  }, [carrinho, setTotalProdutos, setvalorTotal, formaDePagamento]);

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    totalProdutos,
    valorTotal,
    efetuarCompra,
  };
};

export default CarrinhoProvider;
