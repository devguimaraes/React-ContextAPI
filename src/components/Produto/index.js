import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext } from 'Common/Context/Carrinho'


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {

  const { carrinho, adicionarProduto } = useCarrinhoContext()

  const produtoNoCarrinho = carrinho.find((itemDoCarrinho)=> itemDoCarrinho.id === id)
  

  return (
    <Container>
      <div>
        <img
          src={`/assets/${foto}.png`}
          alt={`foto de ${nome}`}
        />
        <p>
          {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton
          disabled={produtoNoCarrinho?.quantidade === 0}
          onClick={()=>console.log('cliquei')}
          color="secondary"
        >
          <RemoveIcon />
        </IconButton>
        {produtoNoCarrinho ? produtoNoCarrinho.quantidade : 0 }
        <IconButton onClick={() => adicionarProduto({ nome, foto, id, valor })
        }>
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  )
}

export default memo(Produto)