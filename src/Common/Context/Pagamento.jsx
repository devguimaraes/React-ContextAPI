import { createContext, useContext, useState } from "react";

export const PagamentoContext = createContext();
PagamentoContext.displayName = "Pagamento Context";

export const PagamentoProvider = ({ children }) => {
  const tiposPagamento = [
    {
      nome: "Boleto",
      Juros: 1,
      id: 1,
    },
    {
      nome: "Cartão de Credito",
      juros: 1.3,
      id: 2,
    },
    {
      nome: "Pix",
      juros: 1,
      id: 3,
    },
    {
      nome: "Crédiário",
      juros: 1.5,
      id: 4,
    },
  ];

  const [formaDePagamento, setFormaDePagamento] = useState(tiposPagamento[0]);
  return (
    <PagamentoContext.Provider
      value={{ formaDePagamento, setFormaDePagamento, tiposPagamento }}
    >
      {children}
    </PagamentoContext.Provider>
  );
};

export const usePagamentoContext = () => {
  const { formaDePagamento, setFormaDePagamento, tiposPagamento } =
    useContext(PagamentoContext);

  const mudarFormaPagamento = (id) => {
    const pagamentoSelecionado = tiposPagamento.find(
      (opcao) => opcao.id === id
    );

    setFormaDePagamento(pagamentoSelecionado);
  };

  return {
    formaDePagamento,
    tiposPagamento,
    mudarFormaPagamento,
  };
};

export default usePagamentoContext;
