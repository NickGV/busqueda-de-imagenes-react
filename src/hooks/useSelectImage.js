import { useState } from "react";

export const useSelectImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredImage, setHoveredImage] = useState(null);

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
    return {
        selectedImage,
        hoveredImage,
        handleImageClick,
        handleCloseImage,
        handleMouseEnter,
        handleMouseLeave,
    };
};
