// import { useState } from "react";
import { useContext, useState } from "react";
import { FetchContext } from "../../context/FetchContext";
import "./FormStyles.css";
export const TodoComponent = () => {
    const [valor, setValor] = useState("people");
    const { fetchPhotos, fetchPhotosNext, fetchPhotosPrevious } =
        useContext(FetchContext);

    const handleInputChange = (e) => {
        setValor(e.target.value);
    };

    const handleSubmit = (e, valor) => {
        e.preventDefault();
        fetchPhotos(valor);
    };

    return (
        <>
            <a href="https://www.pexels.com">Photos provided by Pexels</a>
            <h1 htmlFor="buscar">¿Qué quieres buscar?</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e, valor)}>
                <input
                    type="text"
                    name="buscar"
                    placeholder="Busca una imagen"
                    onChange={handleInputChange}
                />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <div className="buttons-container">
                <button
                    className="button-previous"
                    onClick={() => fetchPhotosPrevious(valor)}
                >
                    Anterior
                </button>
                <button
                    className="button-next"
                    onClick={() => fetchPhotosNext(valor)}
                >
                    Siguiente
                </button>
            </div>
        </>
    );
};
