import "./App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";

function App() {
  // pega os valores do formik (formulário). Atributado no onSubmit do formik
  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
    });
  };
  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  // Validação do formulário com o yup.
  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail")
      .required("Este campo é obrigatório!"),

    password: yup
      .string()
      .min(8, "A senha deve conter pelo menos 8 caracteres")
      .required("Este campo é obrigatório!"),
  });

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail")
      .required("Este campo é obrigatório!"),

    password: yup
      .string()
      .min(8, "A senha deve conter pelo menos 8 caracteres")
      .required("Este campo é obrigatório!"),
    // oneOf ([yup.ref('referencia'), null]) Confirma se o valor do campo é igual.
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  });

  return (
    <div className="all">
      <div className="container">
        <h1>Login</h1>
        <Formik
          initialValues={{}}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          <Form className="login-form">
            <div className="login-form-group">
              <Field name="email" className="form-field" placeholder="Email" />

              <ErrorMessage //Mensagem de erro
                component="span"
                name="email" //ligado à
                className="form-error"
              />
            </div>

            <div className="login-form-group">
              <Field
                name="password"
                className="form-field"
                placeholder="Senha"
                type="password"
              />

              <ErrorMessage //Mensagem de erro
                component="span"
                name="password" //ligado à
                className="form-error"
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
          </Form>
        </Formik>

        <h1>Cadastro</h1>
        <Formik
          initialValues={{}}
          onSubmit={handleClickRegister}
          validationSchema={validationRegister}
        >
          <Form className="login-form">
            <div className="login-form-group">
              <Field name="email" className="form-field" placeholder="Email" />

              <ErrorMessage //Mensagem de erro
                component="span"
                name="email" //ligado à
                className="form-error"
              />
            </div>

            <div className="login-form-group">
              <Field
                name="password"
                className="form-field"
                placeholder="Senha"
                type="password"
              />

              <ErrorMessage //Mensagem de erro
                component="span"
                name="password" //ligado à
                className="form-error"
              />
            </div>

            <div className="login-form-group">
              <Field
                name="confirmPassword"
                className="form-field"
                type="password"
                placeholder="Confirme sua senha"
              />

              <ErrorMessage //Mensagem de erro
                component="span"
                name="confirmPassword" //ligado à
                className="form-error"
              />
            </div>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default App;
