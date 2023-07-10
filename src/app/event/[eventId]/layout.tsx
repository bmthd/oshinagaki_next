import Script from "next/script";

const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <>
        <Script async={false} src="https://platform.twitter.com/widgets.js"></Script>
        {children}</>
    )
}

export default layout;