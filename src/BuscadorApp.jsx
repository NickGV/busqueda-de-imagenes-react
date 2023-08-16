import { TodoComponent } from "./components/todo/TodoComponent";
import "./styles/BuscadorAppStyles.css";
export const App = () => {
    return (
        <>
            <div className="container">
                <TodoComponent/>
            </div>
        </>
    );
};
