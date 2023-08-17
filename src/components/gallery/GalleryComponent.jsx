import { useContext } from "react";
import { FetchContext } from "../../context/FetchContext";
import { useSelectImage } from "../../hooks/useSelectImage";
import "./GalleryStyles.css";
export const GalleryComponent = () => {
    const { data } = useContext(FetchContext);
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
