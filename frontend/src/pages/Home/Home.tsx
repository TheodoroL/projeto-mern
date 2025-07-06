import { Card } from "../../components/Cards/Card"
import { NavBar } from "../../components/NavBar/NavBar"
import { listNews } from "../../data"
import { HomeBody } from "./HomeBody"
export function Home() {
    return (
        <section>
            <NavBar />
            <HomeBody>

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
            </HomeBody>
        </section>
    )
}