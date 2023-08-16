// import { useState } from "react";
import { useState } from "react";
import { useFecth } from "../../hooks/useFecth";
import { useSelectImage } from "../../hooks/useSelectImage";
export const TodoComponent = () => {
    const [valor, setValor] = useState("people");
    const { data, fetchPhotos, fetchPhotosNext, fetchPhotosPrevious } =
        useFecth();

    const handleInputChange = (e) => {
        setValor(e.target.value);
    };

    const handleSubmit = (e, valor) => {
        e.preventDefault();
        fetchPhotos(valor);
    };

    const {
        selectedImage,
        hoveredImage,
        handleImageClick,
        handleCloseImage,
        handleMouseEnter,
        handleMouseLeave,
    } = useSelectImage();

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
            <div className="gallery">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="img-container"
                        width={item.width}
                        height={item.height}
                        onClick={() => handleImageClick(item)}
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={item.src.medium}
                            alt={item.id}
                            className="gallery-image"
                            // onLoad={(event) =>
                            //     handleImageLoad(
                            //         index,
                            //         event.target.width,
                            //         event.target.height
                            //     )
                            // }
                        />
                        {hoveredImage === item && (
                            <div className="image-overlay">
                                <h2>Click para ver mas</h2>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div className="modal" onClick={handleCloseImage}>
                    <div className="modal-content">
                        <img
                            src={selectedImage.src.large}
                            alt={selectedImage.id}
                        />

                        <div className="image-overlay-info">
                            <a
                                href={selectedImage.photographer_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <p>{selectedImage.photographer}</p>
                            </a>

                            <a
                                href={selectedImage.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="original-link"
                            >
                                <button className="download-button">
                                    Para descargar
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
