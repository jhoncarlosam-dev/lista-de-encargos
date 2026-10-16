import { useState } from "react";

function Encargos() {
    const [encargos, setEncargos] = useState([
        { id: 1, texto: "página", hecho: false },
        { id: 2, texto: "rediseño", hecho: false },
        { id: 3, texto: "cuidado mensual", hecho: false },
    ])
    const [texto, setTexto] = useState("")

    function agregar(evento) {
        evento.preventDefault()
        const limpio = texto.trim()
        if (!limpio) return

        setEncargos([
            ...encargos,
            { id: Date.now(), texto: limpio, hecho: false },
        ])
        setTexto("")
    }

    function marcarHecho(id) {
        setEncargos(
            encargos.map((encargo) =>
                encargo.id === id ? { ...encargo, hecho: !encargo.hecho } : encargo
            )
        )
    }

    function borrar(id) {
        setEncargos(encargos.filter((encargo) => encargo.id !== id))
    }

    return (
        <div>
            <h1>Lista de encargos</h1>
            <form onSubmit={agregar}>
                <input
                    value={texto}
                    onChange={(evento) => setTexto(evento.target.value)}
                    placeholder="Nuevo encargo"
                />
                <button type="submit">Agregar</button>
            </form>
            <ul>
                {encargos.map((encargo) => (
                    <li key={encargo.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={encargo.hecho}
                                onChange={() => marcarHecho(encargo.id)}
                            />
                            <span
                                style={{
                                    textDecoration: encargo.hecho ? "line-through" : "none",
                                }}
                            >
                                {encargo.texto}
                            </span>
                        </label>
                        <button type="button" onClick={() => borrar(encargo.id)}>
                            Borrar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Encargos;
