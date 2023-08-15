import { useState } from "react";
import "./styles/BuscadorAppStyles.css";
export const App = () => {
    const [valor, setValor] = useState("people");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredImage, setHoveredImage] = useState(null);

    const API_KEY = "AXp4xSOJke3bIznvxvxF9nprqFXlY9Th56NCWxUqvueY3yHltJsH1iQE ";

    const query = valor;
    const handleInputChange = (e) => {
        setValor(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPhotos();
    };

    const fetchPhotos = async () => {
        await fetch(
            `https://api.pexels.com/v1/search/?page=${page}&query=${query}`,
            {
                headers: {
                    Authorization: API_KEY,
                },
            }
        )
            .then((resp) => {
                return resp.json();
            })
            .then((res) => {
                setData(res.photos);
            });
    };
    const fetchPhotosPrevious = async () => {
        await fetch(
            `https://api.pexels.com/v1/search/?page=${page - 1}&query=${query}`,
            {
                headers: {
                    Authorization: API_KEY,
                },
            }
        )
            .then((resp) => {
                return resp.json();
            })
            .then((res) => {
                setPage((page) => page - 1);
                setData(res.photos);
            });
    };
    const fetchPhotosNext = async () => {
        await fetch(
            `https://api.pexels.com/v1/search/?page=${page + 1}&query=${query}`,
            {
                headers: {
                    Authorization: API_KEY,
                },
            }
        )
            .then((resp) => {
                return resp.json();
            })
            .then((res) => {
                setPage((page) => page + 1);
                setData(res.photos);
            });
    };

    const handleImageLoad = (index, width, height) => {
        const newData = [...data];
        newData[index].width = width;
        newData[index].height = height;
        setData(newData);
    };

    const handleImageClick = (item) => {
        setSelectedImage(item);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    const handleMouseEnter = (item) => {
        setHoveredImage(item);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };
    return (
        <>
            <div className="container">
                <a href="https://www.pexels.com">Photos provided by Pexels</a>
                <h1 htmlFor="buscar">¿Qué quieres buscar?</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="buscar"
                        placeholder="Busca una imagen"
                        onChange={handleInputChange}
                    />
                    <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className="buttons-container">
                    <button className="button-previous" onClick={fetchPhotosPrevious}>Anterior</button>
                    <button className="button-next" onClick={fetchPhotosNext}>Siguiente</button>
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
                                onLoad={(event) =>
                                    handleImageLoad(
                                        index,
                                        event.target.width,
                                        event.target.height
                                    )
                                }
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
            </div>
        </>
    );
};
