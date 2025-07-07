import { useEffect, useState } from "react";
import { Card } from "../../components/Cards/Card";
import { NavBar } from "../../components/NavBar/NavBar";
import { type News, type NewsRequest } from "../../model/newsModel";
import { getAllNews } from "../../services/news.service";
import { HomeBody } from "./HomeBody";

export function Home() {
    const [news, setNews] = useState<News[]>([]);
    useEffect(() => {
        async function fetchNews() {
            const response: NewsRequest[] = await getAllNews();
            const newsMap: News[] = response.map(data => ({
                id: data.id,
                title: data.title,
                text: data.text,
                banner: data.banner,
                user: data.user,
                coments: data.coments.length,
                likes: data.likes.length
            }));
            setNews(newsMap);
        }
        fetchNews();
    }, []);

    return (
        <section>
            <NavBar />
            <HomeBody>
                {news.map((data) => (
                    <Card
                        id={data.id}
                        user={data.user}
                        title={data.title}
                        coments={data.coments}
                        banner={data.banner}
                        likes={data.likes}
                        text={data.text}
                        key={data.id}
                    />
                ))}
            </HomeBody>
        </section>
    );
}