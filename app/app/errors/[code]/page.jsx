export const metadata = {
  title: 'Erro'
};


export default async function Page(props) {
  const code = (await props.params).code;
  const content = {};

  if (code == 400) {
    content.title = "Erro 400";
    content.subtitle = "bad request";
    content.message = "A requisição enviada pelo seu navegador foi corrompida.";
  } else if (code == 401) {
    content.title = "Erro 401";
    content.subtitle = "unauthorized";
    content.message = "Esta ação requer autenticação.";
  } else if (code == 403) {
    content.title = "Erro 403";
    content.subtitle = "forbidden";
    content.message = "Esta ação requer uma autorização especial que você não possui.";
  } else if (code == 404) {
    content.title = "Erro 404";
    content.subtitle = "not found";
    content.message = "O conteúdo que você está procurando não pôde ser recuperado.";
  } else if (code == 500) {
    content.title = "Erro 500";
    content.subtitle = "internal server error";
    content.message = "Um erro ocorreu no servidor durante o processamento de sua requisição.";
  } else {
    content.title = "Erro";
    content.subtitle = "erro não identificado";
    content.message = "Você está vendo esta página porque algum erro estranho ocorreu durante o processamento de sua requisição.";
  }

  return (
    <div className="container text-center">
      <h1 className="text-danger mt-4 fs-2">{content.title}</h1>
      <h2 className="mb-4 fs-4 text-secondary">{content.subtitle}</h2>
      <p className="m-4">{content.message}</p>
    </div>
  );
}
