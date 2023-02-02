import { login } from "./utils";
import "./index.css";
import { useState } from "react";
import { useEffect } from "react";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error && <div className="errorMessage">{error}</div>}
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            autoComplete="off"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              setError(null);
            }}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
              setError(null);
            }}
            value={data.password}
          />
        </div>

        <div className="button">
          <button
            disabled={
              data.email === "" || data.password.length < 6 || isLoading
            }
            onClick={() => {
              setIsLoading(true);
              login(data)
                .then((resp) => {
                  setError(null);
                  setData({ email: "", password: "" });
                  return alert("Sucesso");
                })
                .catch((e) => {
                  setError(e.message);
                  setData({ email: "", password: "" });
                })
                .finally(() => setIsLoading(false));
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
