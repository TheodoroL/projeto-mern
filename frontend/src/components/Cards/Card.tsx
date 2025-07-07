import { type News } from "../../model/newsModel";
import { TextLimit } from "../TextLimit/TextLimit";
import { CardBody, CardContainer, CardFooter } from "./CardStyle";
export function Card({ title, banner, coments, text, likes }: News) {
    return (
        <CardContainer>
            <CardBody>
                <div>
                    <h2>{title}</h2>
                    <img src={banner} alt="imagem zika" />
                </div>
                <TextLimit
                    text={text}
                    limit={150}
                />
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