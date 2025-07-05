import { Card } from "../../components/Cards/Card"
import { NavBar } from "../../components/NavBar/NavBar"
import { listNews } from "../../data"
export function Home() {
    return (
        <section>
            <NavBar />
            {
                listNews.map((data, index) => {
                    return (
                        <Card
                            title={data.title}
                            coments={data.coments}
                            image={data.image}
                            likes={data.likes}
                            text={data.text}
                            key={index}
                        />
                    )
                })
            }
        </section>
    )
}