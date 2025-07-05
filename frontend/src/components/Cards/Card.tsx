import { type News } from "../../data"
export function Card({ title, image, coments, text, likes }: News) {
    return (
        <section>
            <h2>{title}</h2>
            <p>{text}</p>
            <img src={image} alt="imagem zika" />
            <i className="bi bi-hand-thumbs-up"></i>
            <span>{likes}</span>
            <i className="bi bi-chat"></i>
            <span>{coments}</span>
        </section>
    )

}