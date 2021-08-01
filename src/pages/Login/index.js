import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment 
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from 'Common/Context/Usuario';
import { useContext, useEffect, useRef } from "react";


function Login() {
  const {nome, setNome, saldo, setSaldo} = useContext(UsuarioContext)
  const inputRef = useRef()

  const history = useNavigate();

  useEffect(()=>{
    inputRef.current.focus()

  },[])

  return (
    <Container>
      <Titulo>
        Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          ref={inputRef}
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
        type="number"
        value={saldo}
        onChange={(evento) => setSaldo(evento.target.value)}
        startAdornment={
          <InputAdornment position="start">
            R$
          </InputAdornment>
        }
      />
      </InputContainer>
      <Button
        disabled={nome.length < 3}
        variant="contained"
        color="primary"
        onClick={() => history("/feira")}
      >
        Avançar
      </Button>
    </Container>
  )
};

export default Login;