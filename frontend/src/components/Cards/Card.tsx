import { type News } from "../../data";
import { CardBody, CardContainer, CardFooter } from "./CardStyle";
export function Card({ title, image, coments, text, likes }: News) {
    return (
        <CardContainer>
            <CardBody>
                <div>
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
                <img src={image} alt="imagem zika" />
            </CardBody>
            <CardFooter>
                <div>
                    <i className="bi bi-hand-thumbs-up"></i>
                    <span>{likes}</span>
                </div>
                <div>
                    <i className="bi bi-chat"></i>
                    <span>{coments}</span>
                </div>
            </CardFooter>
        </CardContainer>
    )

}