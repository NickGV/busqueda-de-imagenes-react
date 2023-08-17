import { TodoComponent } from "./components/form/FormComponent";
import "./styles/BuscadorAppStyles.css";
import { FetchProvider } from "./context/FetchProvider";
import { GalleryComponent } from "./components/gallery/GalleryComponent";
export const App = () => {
    return (
        <FetchProvider>
            <div className="container">
                <TodoComponent />
                <GalleryComponent />
            </div>
        </FetchProvider>
    );
};
