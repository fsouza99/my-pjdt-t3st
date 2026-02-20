export default function Footer() {
  return (
    <footer className="p-4 mt-5 text-bg-1">
      <div className="row max-w-90 mx-auto">
        <div className="col-md-6">
          <p className="fw-bold fs-2">Projedata</p>
          <p className="m-0">Desenvolvedor de Software Full Stack Júnior</p>
          <p className="m-0">Teste Técnico</p>
        </div>
        <div className="col-md-3">
          <p className="fw-bold fs-5 mt-2 text-warning">Ferramentas</p>
          <p className="m-0">Next.js · React · Bootstrap</p>
          <p className="m-0">ASP.NET Core · C# · EF Core</p>
          <p className="m-0">SQL · SQLite</p>
        </div>
        <div className="col-md-3">
          <p className="fw-bold fs-5 mt-2 text-warning">Contato</p>
          GitHub <a
            className="link-info"
            target="to_blank"
            href="https://www.github.com/fsouza99">
            @fsouza99
          </a>
          <br />
          LinkedIn <a
            className="link-info"
            target="to_blank"
            href="https://www.linkedin.com/in/fs-souza/">
            in/fs-souza
          </a>
          <br />
          Portfólio <a
            className="link-info"
            target="to_blank"
            href="https://sites.google.com/view/fsouza/projetos">
            Projetos
          </a>
        </div>
      </div>
    </footer>
  );
}

