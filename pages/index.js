import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import Error from "next/error";
import StoryList from "../components/StoryList";
import Layout from '../components/Layout'
import Link from "next/link";

class Index extends Component {

    static async getInitialProps({req, res, query}) {
        let stories;
        let page;
        try {
            page = Number(query.page) || 1;
            const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
            stories = await res.json();
        } catch (e) {
            console.error(e);
            stories = [];
        }
        return {stories, page}
    }

    componentDidMount() {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorkerContainer.register('/service-worker.js')
                .then(registration => {
                    console.log('service worker registration successful', registration)
                })
                .catch(err => {
                    console.error("service worker registration failed", err.message);
                });
        }
    }

    render() {

        const {stories, page} = this.props;

        if (stories.length === 0) {
            return <Error statusCode={503}/>
        }

        return (
            <Layout title="Hacker news" description="A hacker new clone made by nextjs">
                <StoryList stories={stories}/>
                <footer>
                    <Link href={`/?page=${page - 1}`}><a>Prev Page</a></Link>  &nbsp;&nbsp;&nbsp;
                    <Link href={`/?page=${page + 1}`}><a>Next Page</a></Link>
                </footer>
                <style global jsx>{`
                    footer {
                        padding: 1em;
                    }
                    footer a{
                        font-weight:bold;
                        color: black;
                        text-decoration: none;
                    }
                `}</style>
            </Layout>
        )
    }
}

export default Index;