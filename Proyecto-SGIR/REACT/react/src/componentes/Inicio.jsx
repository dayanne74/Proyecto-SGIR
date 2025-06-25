import "../Components/Inicio.css"; 

function InicioExcursiones() {
    return (
        <>
            <div className="clip-path"></div>
            <header>
                <a href="" className="logo">Caminantes<span>Por</span>Colombia</a>
                <div className="navbar">
                    <ul>
                        <li><a href="../Components/Excursiones.js">Editar</a></li>
                    </ul>
                </div>
            </header>
            <div className="text">
                <h1>Excursiones</h1>     
                <h2>Bienvenido a la sección de Excursiones</h2>
                <h3>Para vivir experiencias memorables con tu grupo de amigos y crear recuerdos únicos</h3>
            </div>
            <button type="button" className="btn" onClick={() => window.location.href = "./src/Components/InicioExcursiones.jsx"}>
                Explorar
            </button>
        </>
    );
}

export default InicioExcursiones;