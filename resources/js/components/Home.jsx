import {Link} from "react-router-dom";
import sha256 from "crypto-js/sha256";
import './css/Home.css';

const Home = () => {
    function generateLink() {
        return sha256(Date.now() + 'private')
    }

    const myData = {
        isCreator: true
    }
    return (
        <div className="create__game">
            <Link to={`/private/${generateLink()}`} className="create__game__btn" state={myData}>Начать игру</Link>
        </div>
    );
};

export default Home;
