import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useNavigate  } from "react-router-dom";
import { useCarrinhoContext } from 'Common/Context/Carrinho';
export default function NavBar() {
  const history = useNavigate()
  const {totalProdutos} = useCarrinhoContext()

  return (
    <Nav>
      <Logo onClick={()=>history('/')} />
     
      <IconButton disabled={totalProdutos === 0} onClick={()=> history('/carrinho')}  >
        <Badge
          color="primary"
          badgeContent={totalProdutos}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}