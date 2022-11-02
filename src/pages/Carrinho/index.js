import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'Common/Context/Carrinho';
import usePagamentoContext from 'Common/Context/Pagamento';
import { useUsuarioContext } from 'Common/Context/Usuario';
import Produto from 'components/Produto';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';


function Carrinho() {
  const history = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {carrinho, valorTotal} = useCarrinhoContext()
  const {formaDePagamento, mudarFormaPagamento, tiposPagamento} = usePagamentoContext()
  const {saldo = 0} = useUsuarioContext()

  const valorFinal = useMemo(()=> saldo - valorTotal
  ,[saldo, valorTotal])

  return (
    <Container>
      <Voltar onClick={()=> history(-1)} />
      <h2>
        Carrinho
      </h2>
     
      {carrinho.map(produtoCarrinho =>(
        <Produto {...produtoCarrinho} key={produtoCarrinho.id} />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select value={formaDePagamento.id} onChange={(evento)=>{
          mudarFormaPagamento(evento.target.value)
        }}>
          {tiposPagamento.map(opcoesPagamento =>(
            <MenuItem value={opcoesPagamento.id} key={opcoesPagamento.id}>{opcoesPagamento.nome}</MenuItem>
          ))}
        </Select>
        
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho:  </h2>
            <span>R${valorTotal?.toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(saldo).toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {valorFinal.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        disabled={valorFinal <= 0 }
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;