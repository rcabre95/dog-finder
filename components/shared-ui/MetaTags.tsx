import Head from "next/head"
//add keywords later, maybe from breeds api
export default function MetaTags({ title, description, pageUrl, imgUrl="/static/assets/logo.jpg", keywords="" }: { title: string, pageUrl: string, description: string, imgUrl: string, keywords?: string }) {
    return (
        <Head>
            {/* <!-- Primary Meta Tags --> */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="keywords" content={keywords}></meta>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={pageUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imgUrl} />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={pageUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={imgUrl} />
        </Head>
    )
}