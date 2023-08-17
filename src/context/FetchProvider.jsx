import { useState } from "react";
import { FetchContext } from "./FetchContext";

export const FetchProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const API_KEY = "AXp4xSOJke3bIznvxvxF9nprqFXlY9Th56NCWxUqvueY3yHltJsH1iQE ";

    const fetchPhotos = async (query) => {
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
    const fetchPhotosPrevious = async (query) => {
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
    const fetchPhotosNext = async (query) => {
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

    return (
        <FetchContext.Provider
            value={{ data, fetchPhotos, fetchPhotosNext, fetchPhotosPrevious }}
        >
            {children}
        </FetchContext.Provider>
    );
};
