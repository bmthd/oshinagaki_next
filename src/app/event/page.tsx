import { EventList } from "@/components/EventList"
import Head from "next/head"

/**
 * /event
 * イベント一覧を表示するページ
 * @returns 
 */
const page = () => {
    return (
        <>
            <Head><title>掲載イベント一覧</title></Head>
            <EventList />
        </>
    )
    }

export default page